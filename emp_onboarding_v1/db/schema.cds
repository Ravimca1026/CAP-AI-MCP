namespace com.mindset.emp.onboarding;

using { managed, cuid } from '@sap/cds/common';

entity OnboardingRequests : cuid, managed {
  employeeName    : String(100)  @title : 'Employee Name';
  personalEmail   : String(100)  @title : 'Personal Email';
  department      : String(50)   @title : 'Department';
  role            : String(50)   @title : 'Role';
  startDate       : Date         @title : 'Start Date';
  status          : String(20)   @title : 'Status' default 'Draft'; // Draft, InApproval, Active, Rejected
  hrManagerNote   : String(500)  @title : 'HR Manager Note';
  itAssetsNote    : String(500)  @title : 'It Assets Note';
  deptHeadNote    : String(500)  @title : 'Dept Head Note';
  processInstanceId : String(100) @title : 'Process InstanceId'; // BPA workflow instance, set on submit
  laptopRequired      : Boolean   @title : 'Laptop Required'    default false;
  accessCardRequired  : Boolean   @title : 'Access Card Required'    default false;
}


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

















entity Employees : cuid, managed {
  fullName    : String(100);
  email       : String(100);
  department  : String(50);
  role        : String(50);
  startDate   : Date;
}