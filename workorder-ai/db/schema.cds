namespace com.mindset.cap.ai;

using { cuid, managed } from '@sap/cds/common';

entity WorkOrders : cuid, managed {
  title       : String(111)  @mandatory;
  description : String(1000);
  status      : String(20)   default 'OPEN';
  priority    : Association to Priorities;
  category    : Association to Categories;
  technician  : Association to Technicians;
  dueDate     : Date;
}

entity Priorities {
  key code : String(10);
      name : String(40);
}

entity Categories {
  key code : String(10);
      name : String(40);
}

entity Technicians {
  key code : String(10);
      name : String(80);
      skill: String(60);
}
