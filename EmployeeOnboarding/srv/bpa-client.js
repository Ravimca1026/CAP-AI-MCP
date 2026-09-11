const axios = require('axios');

const {
  BPA_API_URL,
  BPA_DEFINITION_ID,
  UAA_URL,
  UAA_CLIENT_ID,
  UAA_CLIENT_SECRET
} = process.env;

async function getToken() {
  const response = await axios.post(
    `${UAA_URL}/oauth/token`,
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: UAA_CLIENT_ID,
      client_secret: UAA_CLIENT_SECRET
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return response.data.access_token;
}

async function triggerBPAProcess(request) {
  const token = await getToken();

  const payload = {
    definitionId: BPA_DEFINITION_ID,
    context: {
      employeename: request.employeeName,
      employeeemail: request.employeeEmail,
      department: request.department,
      role: request.role,
      startdate: request.startDate,
      laptoprequired: request.laptopRequired,
      accesscardrequired: request.accessCardRequired,
      remarks: request.remarks || ''
    }
  };

  const response = await axios.post(
    `${BPA_API_URL}/workflow/rest/v1/workflow-instances`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  console.log('[BPA] Instance created:', response.data.id);
  return response.data;
}

module.exports = { triggerBPAProcess };