namespace com.mindset.mcp;

using { cuid, managed } from '@sap/cds/common';

entity WorkOrders : cuid, managed {
    workOrderId   : String(20) not null;
    description   : String(255);
    status        : String(30);
    priority      : String(20);
    plant         : String(20);
    workCenter    : String(50);
    technician    : String(100);
    plannedDate   : Date;
    completedDate : Date;
}