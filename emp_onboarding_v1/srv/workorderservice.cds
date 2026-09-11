using { com.mindset.emp.onboarding as db } from '../db/schema';

@path: 'workorders'
@odata
service WorkOrderService {

    /**
     * Work orders that can be searched by an AI agent.
     */
    @readonly
    entity WorkOrders as projection on db.WorkOrders;

    /**
     * Returns the status of a specific work order.
     *
     * Use this when the user asks for the status of a work order.
     */
    function getWorkOrderStatus(
        workOrderId : String(20)
    ) returns {
        workOrderId : String(20);
        status      : String(30);
        description : String(255);
    };
}

annotate WorkOrderService with @mcp:'workorders';