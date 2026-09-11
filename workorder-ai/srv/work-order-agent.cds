using { com.mindset.cap.ai as workorderdata } from '../db/schema';

// NOTE: @agent services and the CAP Skills Library are ALPHA at the time
// of writing. Syntax and behavior may change — check the latest CAP
// documentation before relying on this in production.
@agent
service WorkOrderAgentService {

    type TriageResult {
        priority_code   : String;
        category_code   : String;
        technician_code : String;
        reason           : String;
    }

    action triageOrder(
        description : String
    ) returns TriageResult;


    type AgentResponse {
        answer : String(5000);
    }

    action ask(
        question : String(2000)
    ) returns AgentResponse;

}

// @agent service WorkOrderAgentService1 {

//   // Given a free-text description, draft a structured work order
//   // (priority, category, technician suggestion) using the agent's
//   // skill defined in ./skills/triage-work-order.md
//   action triageOrder(description: String) returns workorderdata.WorkOrders;

// }

