using { com.mindset.emp.onboarding as db } from '../db/schema';

// @mcp
service OnboardingService {
  @odata.draft.enabled
  entity OnboardingRequests as projection on db.OnboardingRequests actions {
    action approveRequest(comments: String) returns OnboardingRequests;
    action rejectRequest(comments: String) returns OnboardingRequests;
  };
  entity WorkOrders as projection on db.WorkOrders;

  entity Employees as projection on db.Employees;
  // Custom action for token test
  function getWorkflowToken() returns String;  
  
}
// srv/onboarding-service.cds
  annotate OnboardingService.OnboardingRequests with @odata.draft.bypass;

@mcp service MCPOnboarding {
  entity OnboardingRequests as projection on db.OnboardingRequests;
}



@mcp service MCPOnboardingAnnotte {
  entity OnboardingRequests as projection on db.OnboardingRequests
}

// Serve via OData, HCQL and REST
annotate MCPOnboarding with @odata @hcql @rest;

annotate MCPOnboardingAnnotte with @mcp;
// @mcp.instructions: 'The service allows showing details ';
