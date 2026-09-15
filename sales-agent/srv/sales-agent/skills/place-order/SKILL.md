---
name: place-order
description: Place a sales order for a customer.
---

# Place an order

## Workflow

1. Resolve the customer with `searchAll`. If more than one matches, list
   them and ask which.
2. Resolve the product the same way.
3. Read the product with the Products tool and check `stock` covers the
   requested quantity.
4. Confirm back to the user: customer, product, quantity, unit price and
   total.
5. Call `createOrder`. This action requires human approval, so the task
   pauses. Tell the user you are waiting for approval.
6. On approval, report the order number and total.

## Example

User: order 5 sensor arrays for Northwind

- `searchAll("Northwind")` returns one customer
- `searchAll("sensor array")` returns HW-200
- Products shows stock 8, enough for 5
- Confirm: 5 x HW-200 at 340.00 USD, total 1700.00 USD
- `createOrder`, then wait for approval

## Refusals

- Never place an order if stock is short. Report the available quantity
  and ask whether to reduce it.
- Never place an order for a customer the user has not confirmed.
