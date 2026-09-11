const cds = require('@sap/cds');
const axios = require('axios');
const { triggerBPAProcess, getWorkflowToken } = require('./bpa-service');
const { BPA_DEFINITION_ID } = process.env;

module.exports = cds.service.impl(async function () {
  const { OnboardingRequests, Employees } = this.entities;

  this.before('CREATE', OnboardingRequests, (req) => {
    req.data.status = 'Pending';
  });
  
  this.after('CREATE', OnboardingRequests, async (data) => {
    try {
      await triggerBPAProcess(data);
    } catch (err) {
      console.error('[BPA] Trigger failed:', err.message);
      await UPDATE(OnboardingRequests)
            .set({ status: 'Error' })
            .where({ ID: data.ID }); 
    }
  });
  /**
   * Update approved request
   */
  this.on('approveRequest', async (req) => {
    const {ID} = req.params[0];
    const { comments } = req.data;
    await UPDATE(OnboardingRequests)
      .set({ status: 'Approved', hrManagerNote: comments })
      .where({ ID });

    return await SELECT.one.from(OnboardingRequests).where({ ID });
  });
  /**
   * Update rejected equest
   */
  this.on('rejectRequest', async (req) => {
    const { ID, empID } = req.params[0];
    const { comments } = req.data;
  
    await UPDATE(OnboardingRequests)
      .set({ status: 'Rejected', hrManagerNote: comments })
      .where({ ID });

    return await SELECT.one.from(OnboardingRequests).where({ ID });
  });





















  

   // 2. BPA calls this action back after every task, and again at the end
  this.on('updateApprovalStatus', async (req) => {
    const { requestId, stage, note, decision } = req.data;
    

    if (decision === 'rejected') {
      await UPDATE(OnboardingRequests).set({ status: 'Rejected' }).where({ ID: requestId });
      return;
    }

    const field = { hrManager: 'hrManagerNote', it: 'itAssetsNote', deptHead: 'deptHeadNote' }[stage];
    await UPDATE(OnboardingRequests).set({ [field]: note }).where({ ID: requestId });

    if (stage === 'deptHead') {
      const request = await SELECT.one.from(OnboardingRequests).where({ ID: requestId });
      await INSERT.into(Employees).entries({
        fullName: request.employeeName,
        email: request.personalEmail,
        department: request.department,
        role: request.role,
        startDate: request.startDate,
        request_ID: request.ID
      });
      await UPDATE(OnboardingRequests).set({ status: 'Active' }).where({ ID: requestId });
    }
  });
  
  /**
   * test case for getting token
   */
  this.on('getWorkflowToken', async (req) =>{
    return await getWorkflowToken(req);
  })

});