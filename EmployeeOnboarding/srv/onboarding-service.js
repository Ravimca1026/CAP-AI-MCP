const cds = require('@sap/cds');
const { triggerBPAProcess } = require('./bpa-client');

module.exports = cds.service.impl(async function () {

  this.before('CREATE', 'OnboardingRequests', (req) => {
    req.data.status = 'PENDING';
  });

  this.after('CREATE', 'OnboardingRequests', async (data) => {
    try {
      await triggerBPAProcess(data);
    } catch (err) {
      console.error('[BPA] Trigger failed:', err.message);
    }
  });

});