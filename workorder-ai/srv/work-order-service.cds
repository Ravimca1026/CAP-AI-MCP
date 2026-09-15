using { com.mindset.cap.ai as workorderdata } from '../db/schema';
@agent
service WorkOrderService {
    entity WorkOrders as projection on workorderdata.WorkOrders;
    entity Priorities as projection on workorderdata.Priorities;
    entity Categories as projection on workorderdata.Categories;
    entity Technicians as projection on workorderdata.Technicians;
    type AgentResponse {
        answer : String(5000);
    }
    
    action ask(
        question : String(2000)
    ) returns AgentResponse;

}
