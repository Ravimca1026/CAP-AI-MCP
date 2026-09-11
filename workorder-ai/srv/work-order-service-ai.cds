// using WorkOrderService from './work-order-service';

// // -------------------------------------------------------------------------
// // AI-powered field recommendations (SAP RPT-1 via @cap-js/ai)
// // Simply adding a @Common.ValueList annotation is enough — the AI Core
// // plugin automatically detects it and provides recommendations in
// // Fiori draft-enabled UIs. No custom handler code required.
// // -------------------------------------------------------------------------

// annotate WorkOrderService.WorkOrders with {

//   priority @Common.ValueList: {
//     CollectionPath: 'Priorities',
//     Parameters: [{
//       $Type              : 'Common.ValueListParameterInOut',
//       ValueListProperty  : 'code',
//       LocalDataProperty  : priority_code
//     }]
//   };

//   category @Common.ValueList: {
//     CollectionPath: 'Categories',
//     Parameters: [{
//       $Type              : 'Common.ValueListParameterInOut',
//       ValueListProperty  : 'code',
//       LocalDataProperty  : category_code
//     }]
//   };

//   technician @Common.ValueList: {
//     CollectionPath: 'Technicians',
//     Parameters: [{
//       $Type              : 'Common.ValueListParameterInOut',
//       ValueListProperty  : 'code',
//       LocalDataProperty  : technician_code
//     }]
//   };

//   // Status is set by workflow, not something we want AI guessing at
//   status @UI.RecommendationState: 0;
// };


using WorkOrderService from './work-order-service';

annotate WorkOrderService.WorkOrders with {

    priority @Common.ValueList: {
        CollectionPath: 'Priorities',
        Parameters: [{
            $Type: 'Common.ValueListParameterInOut',
            ValueListProperty: 'code',
            LocalDataProperty: priority_code
        }]
    };

    category @Common.ValueList: {
        CollectionPath: 'Categories',
        Parameters: [{
            $Type: 'Common.ValueListParameterInOut',
            ValueListProperty: 'code',
            LocalDataProperty: category_code
        }]
    };

    technician @Common.ValueList: {
        CollectionPath: 'Technicians',
        Parameters: [{
            $Type: 'Common.ValueListParameterInOut',
            ValueListProperty: 'code',
            LocalDataProperty: technician_code
        }]
    };

    status @UI.RecommendationState: 0;
};