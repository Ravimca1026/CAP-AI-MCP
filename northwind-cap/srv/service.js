const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

  const nw = await cds.connect.to('Northwind');

  // ─── Core Entities ────────────────────────────────────────────

  // Categories → Products
  this.on('READ', 'Categories', req => nw.run(req.query));
  // $expand=Products

  // Customers → Orders, CustomerDemographics
  this.on('READ', 'Customers', req => nw.run(req.query));
  // $expand=Orders
  // $expand=CustomerDemographics

  // CustomerDemographics → Customers
  this.on('READ', 'CustomerDemographics', req => nw.run(req.query));
  // $expand=Customers

  // Employees → Orders, Territories, self-join (Manager/Subordinates)
  this.on('READ', 'Employees', req => nw.run(req.query));
  // $expand=Orders
  // $expand=Territories
  // $expand=Employee1       (manager)
  // $expand=Employees1      (subordinates)

  // Orders → Customer, Employee, Order_Details, Shipper
  this.on('READ', 'Orders', req => nw.run(req.query));
  // $expand=Customer
  // $expand=Employee
  // $expand=Order_Details
  // $expand=Shipper

  // Order_Details → Order, Product
  this.on('READ', 'Order_Details', req => nw.run(req.query));
  // $expand=Order
  // $expand=Product

  // Products → Category, Supplier, Order_Details
  this.on('READ', 'Products', req => nw.run(req.query));
  // $expand=Category
  // $expand=Supplier
  // $expand=Order_Details

  // Suppliers → Products
  this.on('READ', 'Suppliers', req => nw.run(req.query));
  // $expand=Products

  // Shippers → Orders
  this.on('READ', 'Shippers', req => nw.run(req.query));
  // $expand=Orders

  // Regions → Territories
  this.on('READ', 'Regions', req => nw.run(req.query));
  // $expand=Territories

  // Territories → Region, Employees
  this.on('READ', 'Territories', req => nw.run(req.query));
  // $expand=Region
  // $expand=Employees

  // ─── View / Report Entities (no relations, read-only views) ───

  this.on('READ', 'Alphabetical_list_of_products',    req => nw.run(req.query));
  this.on('READ', 'Category_Sales_for_1997',          req => nw.run(req.query));
  this.on('READ', 'Current_Product_Lists',            req => nw.run(req.query));
  this.on('READ', 'Customer_and_Suppliers_by_Cities', req => nw.run(req.query));
  this.on('READ', 'Invoices',                         req => nw.run(req.query));
  this.on('READ', 'Order_Details_Extendeds',          req => nw.run(req.query));
  this.on('READ', 'Order_Subtotals',                  req => nw.run(req.query));
  this.on('READ', 'Orders_Qries',                     req => nw.run(req.query));
  this.on('READ', 'Product_Sales_for_1997',           req => nw.run(req.query));
  this.on('READ', 'Products_Above_Average_Prices',    req => nw.run(req.query));
  this.on('READ', 'Products_by_Categories',           req => nw.run(req.query));
  this.on('READ', 'Sales_by_Categories',              req => nw.run(req.query));
  this.on('READ', 'Sales_Totals_by_Amounts',          req => nw.run(req.query));
  this.on('READ', 'Summary_of_Sales_by_Quarters',     req => nw.run(req.query));
  this.on('READ', 'Summary_of_Sales_by_Years',        req => nw.run(req.query));

});