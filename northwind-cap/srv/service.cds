using { Northwind as nw } from './external/Northwind';

service NorthwindService {

  // ─── Core Entities ────────────────────────────────────────────

  @readonly entity Categories        as projection on nw.Categories;
  @readonly entity Customers         as projection on nw.Customers;
  @readonly entity CustomerDemographics as projection on nw.CustomerDemographics;
  @readonly entity Employees         as projection on nw.Employees;
  @readonly entity Orders            as projection on nw.Orders;
  @readonly entity Order_Details     as projection on nw.Order_Details;
  @readonly entity Products          as projection on nw.Products;
  @readonly entity Suppliers         as projection on nw.Suppliers;
  @readonly entity Shippers          as projection on nw.Shippers;
  @readonly entity Regions           as projection on nw.Regions;
  @readonly entity Territories       as projection on nw.Territories;

  // ─── View / Report Entities ───────────────────────────────────

  @readonly entity Alphabetical_list_of_products    as projection on nw.Alphabetical_list_of_products;
  @readonly entity Category_Sales_for_1997          as projection on nw.Category_Sales_for_1997;
  @readonly entity Current_Product_Lists            as projection on nw.Current_Product_Lists;
  @readonly entity Customer_and_Suppliers_by_Cities as projection on nw.Customer_and_Suppliers_by_Cities;
  @readonly entity Invoices                         as projection on nw.Invoices;
  @readonly entity Order_Details_Extendeds          as projection on nw.Order_Details_Extendeds;
  @readonly entity Order_Subtotals                  as projection on nw.Order_Subtotals;
  @readonly entity Orders_Qries                     as projection on nw.Orders_Qries;
  @readonly entity Product_Sales_for_1997           as projection on nw.Product_Sales_for_1997;
  @readonly entity Products_Above_Average_Prices    as projection on nw.Products_Above_Average_Prices;
  @readonly entity Products_by_Categories           as projection on nw.Products_by_Categories;
  @readonly entity Sales_by_Categories              as projection on nw.Sales_by_Categories;
  @readonly entity Sales_Totals_by_Amounts          as projection on nw.Sales_Totals_by_Amounts;
  @readonly entity Summary_of_Sales_by_Quarters     as projection on nw.Summary_of_Sales_by_Quarters;
  @readonly entity Summary_of_Sales_by_Years        as projection on nw.Summary_of_Sales_by_Years;

}
