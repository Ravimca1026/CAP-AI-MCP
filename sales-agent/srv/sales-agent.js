const cds = require('@sap/cds')

module.exports = class SalesAgent extends cds.ApplicationService {

  async init () {
    const { Customers, Products, SalesOrders, SalesOrderItems } = this.entities
    const db = await cds.connect.to('db')

    // ---- Guard rails on every read the agent performs -------------------

    this.before('READ', '*', req => {
      const q = req.query.SELECT
      if (!q.limit || !q.limit.rows) q.limit = { rows: { val: 50 } }
      else if (q.limit.rows.val > 500) q.limit.rows.val = 500
    })

    this.after('READ', Customers, (rows, req) => {
      if (req.user.is('admin')) return
      for (const r of [rows].flat()) if (r && r.email) r.email = '***@***'
    })

    // ---- salesSummary ---------------------------------------------------

    this.on('salesSummary', async req => {
      const { from, to, region } = req.data
      const w = []
      const and = () => { if (w.length) w.push('and') }

      if (from)   { and(); w.push({ ref: ['orderDate'] }, '>=', { val: from }) }
      if (to)     { and(); w.push({ ref: ['orderDate'] }, '<=', { val: to }) }
      if (region) { and(); w.push({ ref: ['customer', 'region'] }, '=', { val: region }) }
      and(); w.push({ ref: ['status'] }, '!=', { val: 'cancelled' })

      const row = await db.run(
        SELECT.one.from(SalesOrders).columns(
          'count(*) as orders',
          'sum(totalAmount) as revenue',
          'avg(totalAmount) as avgOrderValue'
        ).where(w)
      )

      return {
        orders: (row && row.orders) || 0,
        revenue: (row && row.revenue) || 0,
        avgOrderValue: (row && row.avgOrderValue) || 0,
        scope: `${from || 'earliest'} to ${to || 'latest'}, ${region || 'all regions'}, cancelled orders excluded`
      }
    })

    // ---- topCustomers ---------------------------------------------------

    this.on('topCustomers', async req => {
      const top = Math.min(Math.max(req.data.top || 5, 1), 50)
      const w = [{ ref: ['status'] }, '!=', { val: 'cancelled' }]
      if (req.data.region) {
        w.push('and', { ref: ['customer', 'region'] }, '=', { val: req.data.region })
      }

      return db.run(
        SELECT.from(SalesOrders)
          .columns(
            'customer.ID as customerId',
            'customer.name as customerName',
            'customer.region as region',
            'count(*) as orders',
            'sum(totalAmount) as revenue'
          )
          .where(w)
          .groupBy('customer.ID', 'customer.name', 'customer.region')
          .orderBy('revenue desc')
          .limit(top)
      )
    })

    // ---- lowStock -------------------------------------------------------

    this.on('lowStock', req => db.run(
      SELECT.from(Products)
        .columns('sku', 'name', 'category', 'stock')
        .where({ stock: { '<=': req.data.threshold != null ? req.data.threshold : 10 } })
        .orderBy('stock asc')
        .limit(200)
    ))

    // ---- searchAll ------------------------------------------------------

    this.on('searchAll', async req => {
      const term = (req.data.term || '').trim()
      if (term.length < 2) {
        return req.reject(400, 'Search term must be at least 2 characters. Ask the user to be more specific.')
      }
      const like = `%${term.toLowerCase()}%`

      const [c, p, o] = await Promise.all([
        db.run(SELECT.from(Customers).columns('ID', 'name', 'country', 'region')
          .where`lower(name) like ${like}`.limit(20)),
        db.run(SELECT.from(Products).columns('ID', 'sku', 'name', 'category')
          .where`lower(name) like ${like} or lower(sku) like ${like}`.limit(20)),
        db.run(SELECT.from(SalesOrders).columns('ID', 'orderNo', 'status', 'totalAmount')
          .where`lower(orderNo) like ${like}`.limit(20))
      ])

      return [
        ...c.map(x => ({ entity: 'Customers', id: x.ID, label: x.name, detail: `${x.region} / ${x.country}` })),
        ...p.map(x => ({ entity: 'Products', id: x.ID, label: `${x.sku} ${x.name}`, detail: x.category })),
        ...o.map(x => ({ entity: 'SalesOrders', id: x.ID, label: x.orderNo, detail: `${x.status}, ${x.totalAmount}` }))
      ]
    })

    // ---- createOrder (gated by @agent.hitl) -----------------------------

    this.on('createOrder', async req => {
      const { customer, product, quantity } = req.data

      if (!(quantity > 0)) return req.reject(400, 'Quantity must be greater than zero.')

      const [cust, prod] = await Promise.all([
        db.run(SELECT.one.from(Customers).where({ ID: customer })),
        db.run(SELECT.one.from(Products).where({ ID: product }))
      ])

      if (!cust) return req.reject(404, `No customer with ID ${customer}. Use searchAll to find the right one.`)
      if (!prod) return req.reject(404, `No product with ID ${product}. Use searchAll to find the right one.`)
      if (prod.stock < quantity) {
        return req.reject(409, `Only ${prod.stock} units of ${prod.sku} in stock.`)
      }

      const netAmount = Number((prod.price * quantity).toFixed(2))
      const ID = cds.utils.uuid()
      const orderNo = 'SO-' + Date.now().toString().slice(-8)

      await db.tx(req).run([
        INSERT.into(SalesOrders).entries({
          ID,
          orderNo,
          customer_ID: customer,
          orderDate: new Date().toISOString().slice(0, 10),
          status: 'open',
          totalAmount: netAmount,
          currency: prod.currency
        }),
        INSERT.into(SalesOrderItems).entries({
          ID: cds.utils.uuid(),
          order_ID: ID,
          product_ID: product,
          quantity,
          unitPrice: prod.price,
          netAmount
        }),
        UPDATE(Products, product).with({ stock: { '-=': quantity } })
      ])

      return { ID, orderNo, totalAmount: netAmount, currency: prod.currency }
    })

    await super.init()
  }
}
