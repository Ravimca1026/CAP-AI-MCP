namespace sales;

using { cuid, managed } from '@sap/cds/common';

/**
 * A customer company that places sales orders.
 */
entity Customers : cuid, managed {
  /** Legal company name. */
  name    : String(120);
  /** ISO 3166-1 alpha-2 country code, e.g. US, DE, IN. */
  country : String(2);
  /** Sales region. One of AMER, EMEA, APJ. */
  region  : String(10);
  /** Primary contact email address. */
  email   : String(120);
  /** All orders placed by this customer. */
  orders  : Association to many SalesOrders on orders.customer = $self;
}

/**
 * A sellable product held in stock.
 */
entity Products : cuid, managed {
  /** Stock keeping unit, the human readable product code. */
  sku      : String(20);
  /** Product name. */
  name     : String(120);
  /** Product category, e.g. Hardware, Software, Service. */
  category : String(40);
  /** Unit list price. */
  price    : Decimal(11,2);
  /** ISO currency code of the price. */
  currency : String(3) default 'USD';
  /** Units currently available in the warehouse. */
  stock    : Integer default 0;
}

/**
 * A sales order header.
 */
entity SalesOrders : cuid, managed {
  /** Human readable order number. */
  orderNo     : String(20);
  /** The customer who placed the order. */
  customer    : Association to Customers;
  /** Date the order was placed. */
  orderDate   : Date;
  /** Lifecycle status of the order. */
  status      : String(12) enum {
    open;
    confirmed;
    shipped;
    cancelled;
  } default 'open';
  /** Sum of all item net amounts. */
  totalAmount : Decimal(13,2) default 0;
  /** ISO currency code of the total. */
  currency    : String(3) default 'USD';
  /** The line items of this order. */
  items       : Composition of many SalesOrderItems on items.order = $self;
}

/**
 * A single line item on a sales order.
 */
entity SalesOrderItems : cuid {
  /** The order this item belongs to. */
  order     : Association to SalesOrders;
  /** The product being ordered. */
  product   : Association to Products;
  /** Number of units ordered. */
  quantity  : Integer;
  /** Unit price at the time of ordering. */
  unitPrice : Decimal(11,2);
  /** quantity multiplied by unitPrice. */
  netAmount : Decimal(13,2);
}
