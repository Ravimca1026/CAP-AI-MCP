import cds from '@sap/cds';

export default class WorkOrderService extends cds.ApplicationService {

    async init() {

        this.on('getWorkOrderStatus', async (req) => {

            const { workOrderId } = req.data;

            if (!workOrderId) {
                return req.error(
                    400,
                    'Work Order ID is required'
                );
            }

            const workOrder = await SELECT.one
                .from('capjoulemcp.WorkOrders')
                .where({ workOrderId });

            if (!workOrder) {
                return req.error(
                    404,
                    `Work Order ${workOrderId} was not found`
                );
            }

            return {
                workOrderId: workOrder.workOrderId,
                description: workOrder.description,
                status: workOrder.status,
                priority: workOrder.priority
            };
        });

        return super.init();
    }
}