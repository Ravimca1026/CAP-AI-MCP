const cds = require('@sap/cds');
const axios = require('axios');
const BPA_DEFINITION_ID = process.env.BPA_DEFINITION_ID || 'us10.mindset-development.emponboardingprocessflow.empOnboardingProcessFlow';
const { OnboardingRequests, Employees } = cds.entities;
async function triggerBPAProcess(request) {
    let srv = null;
    try {
      srv = await cds.connect.to('BPA_WORKFLOW');
    } catch (err) {
      srv = null;
    };
    const workflowPayload = {
      definitionId: BPA_DEFINITION_ID,
      context: {
            ID          : request.ID,
            employeename: request.employeeName,
            personalemail: request.personalEmail,
            department: request.department,
            role: request.role,
            startdate: request.startDate
                ? new Date(request.startDate).toISOString().split("T")[0]
                : null,
            laptoprequired: request.laptopRequired,
            accesscardrequired: request.accessCardRequired,
            status: request.status,
            IsActiveEntity: request.IsActiveEntity || true
        }
    };

    let workflowResponse;
    try {
      if (srv) {
        workflowResponse = await srv.send({
          method: 'POST',
          path: '/workflow/rest/v1/workflow-instances',
          data: workflowPayload
        });

        console.log('[BPA] Instance created:', workflowResponse.id);
        return workflowResponse;
      } else {
        const sToken = await getWorkflowToken();
        const WORKFLOW_SERVICE_URL = process.env.WORKFLOW_SERVICE_URL || 'https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com'
        try {
          const response = await axios.post(
            `${WORKFLOW_SERVICE_URL}/workflow/rest/v1/workflow-instances`,
            workflowPayload,
            {  headers: {
              Authorization: `Bearer ${sToken}`,
              "Content-Type": "application/json"
          } }
        );
        workflowResponse = response.data;
        } catch (err) {
          await UPDATE(OnboardingRequests)
            .set({ status: 'Error' })
            .where({ ID: request.ID });  
        }
          
      }
    } catch (error) {
      await UPDATE(OnboardingRequests)
          .set({ status: 'Error' })
          .where({ ID: request.ID });
    }
    if (workflowResponse) {
      await UPDATE(OnboardingRequests)
        .set({ status: 'InApproval', processInstanceId: workflowResponse.id })
        .where({ ID: request.ID });
    }
    return workflowResponse?.id;
}




























/**
   * Getting tokendata
   * return token
   */
async function getWorkflowToken(request) {
  const UAA_URL = process.env.UAA_URL || `https://mindset-development.authentication.us10.hana.ondemand.com`;
  const UAA_CLIENT_ID = process.env.UAA_CLIENT_ID || `sb-8fba328f-ec13-4450-b39a-dc1c8ba0197a!b624379|xsuaa!b49390`;
  const UAA_CLIENT_SECRET = process.env.UAA_CLIENT_SECRET || `eb941163-c0aa-4401-ae6e-f209a144cb01$JhACpHWF8jKtFbrhmC-gf71kGt-LcnKY2M6wkxLeP08=`;
  const response = await axios.post(
      `${UAA_URL}/oauth/token`,
      new URLSearchParams({
      grant_type:    'client_credentials',
      client_id:     UAA_CLIENT_ID,
      client_secret: UAA_CLIENT_SECRET
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return response.data.access_token;
}
module.exports = { triggerBPAProcess, getWorkflowToken };