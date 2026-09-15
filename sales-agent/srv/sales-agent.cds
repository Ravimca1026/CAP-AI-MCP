using { sales } from '../db/schema';

/**
 * Sales assistant. Answers questions about customers, products
 * and orders, and can place an order after human approval.
 */
@agent
@requires: 'agent'
service SalesAgent {

  /** Customers who place sales orders. */
  @readonly entity Customers as projection on sales.Customers {
    ID, name, country, region, email, orders
  };

  /** Products with current stock levels. */
  @readonly entity Products as projection on sales.Products {
    ID, sku, name, category, price, currency, stock
  };

  /** Sales order headers with line items. */
  @readonly entity SalesOrders as projection on sales.SalesOrders {
    ID, orderNo, customer, orderDate, status, totalAmount, currency, items
  };

  /** Line items of a sales order. */
  @readonly entity SalesOrderItems as projection on sales.SalesOrderItems {
    ID, order, product, quantity, unitPrice, netAmount
  };

  /** Revenue, order count and average order value for a period and region. */
  function salesSummary (
    /** Inclusive start date, YYYY-MM-DD. Optional. */
    from   : Date,
    /** Inclusive end date, YYYY-MM-DD. Optional. */
    to     : Date,
    /** AMER, EMEA or APJ. Optional. */
    region : String
  ) returns SummaryResult;

  /** Highest spending customers, ranked by revenue. */
  function topCustomers (
    /** How many to return. Default 5, maximum 50. */
    top    : Integer,
    /** AMER, EMEA or APJ. Optional. */
    region : String
  ) returns array of CustomerRevenue;

  /** Products at or below a stock threshold. */
  function lowStock (
    /** Units at or below which stock counts as low. Default 10. */
    threshold : Integer
  ) returns array of StockLine;

  /** Find customers, products or orders by partial name, SKU or order number. */
  function searchAll (
    /** Text to look for. Case insensitive. Minimum 2 characters. */
    term : String
  ) returns array of SearchHit;

  /** Place a sales order for one product. Reduces stock. */
  @requires: 'admin'
  action createOrder (
    /** UUID of the customer. */
    customer : UUID,
    /** UUID of the product. */
    product  : UUID,
    /** Units to order. Must be positive and within available stock. */
    quantity : Integer
  ) returns OrderRef;

  type SummaryResult {
    orders        : Integer;
    revenue       : Decimal(15,2);
    avgOrderValue : Decimal(13,2);
    scope         : String;
  }

  type CustomerRevenue {
    customerId   : UUID;
    customerName : String;
    region       : String;
    orders       : Integer;
    revenue      : Decimal(15,2);
  }

  type StockLine {
    sku      : String;
    name     : String;
    category : String;
    stock    : Integer;
  }

  type SearchHit {
    entity : String;
    id     : UUID;
    label  : String;
    detail : String;
  }

  type OrderRef {
    ID          : UUID;
    orderNo     : String;
    totalAmount : Decimal(13,2);
    currency    : String;
  }
}

// Pause and ask the user before the agent writes anything.
annotate SalesAgent.createOrder with @agent.hitl;
