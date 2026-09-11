using WorkOrderService from './work-order-service';

annotate WorkOrderService.WorkOrders with @(
  UI.LineItem: [
    { Value: title },
    { Value: status },
    { Value: priority_code, Label: 'Priority' },
    { Value: category_code, Label: 'Category' },
    { Value: technician_code, Label: 'Technician' },
    { Value: dueDate }
  ],
  UI.HeaderInfo: {
    TypeName      : 'Work Order',
    TypeNamePlural: 'Work Orders',
    Title         : { Value: title }
  },
  UI.Facets: [
    {
      $Type : 'UI.ReferenceFacet',
      Label : 'Details',
      Target: '@UI.FieldGroup#Main'
    }
  ],
  UI.FieldGroup#Main: {
    Data: [
      { Value: title },
      { Value: description },
      { Value: status },
      { Value: priority_code, Label: 'Priority' },
      { Value: category_code, Label: 'Category' },
      { Value: technician_code, Label: 'Technician' },
      { Value: dueDate }
    ]
  }
);
