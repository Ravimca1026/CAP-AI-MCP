import cds from '@sap/cds'

export default cds.service.impl(function () {

    this.on('triageOrder', async req => {

        const { description } = req.data

        if (!description) {
            return req.error(400, 'Description is required')
        }

        const text = description.toLowerCase()

        let priority_code = 'LOW'
        let category_code = 'MECHANICAL'
        let technician_code = 'TECH01'
        let reason = 'Default classification based on the description.'

        if (
            text.includes('stopped') ||
            text.includes('production down') ||
            text.includes('critical') ||
            text.includes('safety')
        ) {
            priority_code = 'HIGH'
        }

        if (
            text.includes('motor') ||
            text.includes('pump') ||
            text.includes('mechanical') ||
            text.includes('vibration')
        ) {
            category_code = 'MECHANICAL'
            technician_code = 'TECH01'
            reason = 'The description indicates a mechanical issue.'
        }

        else if (
            text.includes('electrical') ||
            text.includes('sensor') ||
            text.includes('power') ||
            text.includes('panel')
        ) {
            category_code = 'ELECTRICAL'
            technician_code = 'TECH02'
            reason = 'The description indicates an electrical issue.'
        }

        else if (
            text.includes('water') ||
            text.includes('pipe') ||
            text.includes('leak') ||
            text.includes('plumbing')
        ) {
            category_code = 'PLUMBING'
            technician_code = 'TECH03'
            reason = 'The description indicates a plumbing issue.'
        }

        else if (
            text.includes('hvac') ||
            text.includes('air conditioning') ||
            text.includes('cooling')
        ) {
            category_code = 'HVAC'
            technician_code = 'TECH04'
            reason = 'The description indicates an HVAC issue.'
        }

        else if (
            text.includes('network') ||
            text.includes('printer') ||
            text.includes('computer') ||
            text.includes('it ')
        ) {
            category_code = 'IT'
            technician_code = 'TECH05'
            reason = 'The description indicates an IT issue.'
        }

        return {
            priority_code,
            category_code,
            technician_code,
            reason
        }
    })

    this.on('ask1', async req => {

        const question = req.data.question

        if (!question) {
            return req.error(400, 'Please provide a question')
        }

        const q = question.toLowerCase()

        const db = await cds.connect.to('db')

        const {
            WorkOrders,
            Priorities,
            Categories,
            Technicians
        } = cds.entities('com.mindset.cap.ai')

        /*
         * User asks about high-priority work orders
         */
        if (
            q.includes('high priority') ||
            q.includes('high-priority')
        ) {

            const orders = await SELECT.from(WorkOrders)
                .where({ priority_code: 'HIGH' })

            if (orders.length === 0) {
                return {
                    answer: 'There are no high-priority work orders.'
                }
            }

            const result = orders.map(order =>
                `• ${order.title} - ${order.status}`
            ).join('\n')

            return {
                answer:
                    `I found ${orders.length} high-priority work order(s):\n\n${result}`
            }
        }


        /*
         * User asks about mechanical work orders
         */
        if (q.includes('mechanical')) {

            const orders = await SELECT.from(WorkOrders)
                .where({ category_code: 'MECHANICAL' })

            if (orders.length === 0) {
                return {
                    answer: 'There are no mechanical work orders.'
                }
            }

            const result = orders.map(order =>
                `• ${order.title} - ${order.status}`
            ).join('\n')

            return {
                answer:
                    `I found ${orders.length} mechanical work order(s):\n\n${result}`
            }
        }


        /*
         * User asks about open work orders
         */
        if (
            q.includes('open work orders') ||
            q.includes('open orders')
        ) {

            const orders = await SELECT.from(WorkOrders)
                .where({ status: 'OPEN' })

            if (orders.length === 0) {
                return {
                    answer: 'There are no open work orders.'
                }
            }

            const result = orders.map(order =>
                `• ${order.title} - ${order.description}`
            ).join('\n')

            return {
                answer:
                    `I found ${orders.length} open work order(s):\n\n${result}`
            }
        }


        /*
         * User asks for all work orders
         */
        if (
            q.includes('all work orders') ||
            q.includes('show work orders') ||
            q.includes('list work orders')
        ) {

            const orders = await SELECT.from(WorkOrders)

            if (orders.length === 0) {
                return {
                    answer: 'There are no work orders.'
                }
            }

            const result = orders.map(order =>
                `• ${order.title} - ${order.status}`
            ).join('\n')

            return {
                answer:
                    `I found ${orders.length} work order(s):\n\n${result}`
            }
        }


        /*
         * Default response
         */
        return {
            answer:
                `I couldn't understand the request yet. You can ask things like:
                
• Show me all work orders
• Show me high priority work orders
• Show me mechanical work orders
• Show me open work orders`
        }
    })

    

    this.on('ask', async req => {

        const question = req.data.question?.trim()

        if (!question) {
            return req.error(400, 'Please provide a question.')
        }

        const q = question.toLowerCase().trim()


        /*
        * =========================================================
        * 1. GET DATABASE ENTITIES
        * =========================================================
        */

        const {
            WorkOrders,
            Priorities,
            Categories,
            Technicians
        } = cds.entities('com.mindset.cap.ai')


        /*
        * =========================================================
        * 2. QUERY VARIABLES
        * =========================================================
        */

        const filters = []

        let orderBy = []
        let limit = null
        let searchText = null


        /*
        * Count request
        */

        const isCountRequest =
            q.includes('how many') ||
            q.includes('count') ||
            q.includes('number of')


        /*
        * =========================================================
        * 3. FILTER HELPER
        *
        * Keep filters internally in one format.
        *
        * Example:
        *
        * {
        *     field: 'status',
        *     operator: '=',
        *     value: 'OPEN'
        * }
        * =========================================================
        */

        const addFilter =
            (field, operator, value) => {

                filters.push({
                    field,
                    operator,
                    value
                })

            }


        /*
        * =========================================================
        * 4. STATUS
        * =========================================================
        */

        if (
            q.includes('open work orders') ||
            q.includes('open orders') ||
            q.includes('open work')
        ) {

            addFilter(
                'status',
                '=',
                'OPEN'
            )

        }
        else if (
            q.includes('closed work orders') ||
            q.includes('closed orders')
        ) {

            addFilter(
                'status',
                '=',
                'CLOSED'
            )

        }
        else if (
            q.includes('in progress') ||
            q.includes('in-progress')
        ) {

            addFilter(
                'status',
                '=',
                'IN_PROGRESS'
            )

        }


        /*
        * =========================================================
        * 5. PRIORITY
        * =========================================================
        */

        if (
            q.includes('high priority') ||
            q.includes('high-priority') ||
            q.includes('urgent') ||
            q.includes('critical')
        ) {

            addFilter(
                'priority_code',
                '=',
                'HIGH'
            )

        }
        else if (
            q.includes('medium priority') ||
            q.includes('medium-priority')
        ) {

            addFilter(
                'priority_code',
                '=',
                'MEDIUM'
            )

        }
        else if (
            q.includes('low priority') ||
            q.includes('low-priority')
        ) {

            addFilter(
                'priority_code',
                '=',
                'LOW'
            )

        }


        /*
        * =========================================================
        * 6. CATEGORY
        *
        * Longer phrases come first.
        * =========================================================
        */

        const categoryMap = {

            'air conditioning': 'HVAC',
            'it equipment': 'IT',

            mechanical: 'MECHANICAL',
            electrical: 'ELECTRICAL',
            plumbing: 'PLUMBING',
            hvac: 'HVAC',
            it: 'IT'

        }


        for (const [text, code] of Object.entries(categoryMap)) {

            if (q.includes(text)) {

                addFilter(
                    'category_code',
                    '=',
                    code
                )

                break
            }

        }


        /*
        * =========================================================
        * 7. TECHNICIAN
        * =========================================================
        */

        let technicians = []

        try {

            technicians =
                await cds.db.run(
                    SELECT.from(Technicians)
                )

        }
        catch (error) {

            console.error(
                'Unable to read technicians:',
                error
            )

        }


        for (const technician of technicians) {

            const name =
                technician.name?.toLowerCase() || ''

            const code =
                technician.code?.toLowerCase() || ''


            if (
                (name && q.includes(name)) ||
                (code && q.includes(code))
            ) {

                addFilter(
                    'technician_code',
                    '=',
                    technician.code
                )

                break
            }

        }


        /*
        * =========================================================
        * 8. OVERDUE
        *
        * Example:
        *
        * Find overdue work orders
        *
        * Means:
        *
        * dueDate < today
        * AND status != CLOSED
        * =========================================================
        */

        const isOverdueRequest =
            q.includes('overdue') ||
            q.includes('past due')


        if (isOverdueRequest) {

            const today =
                new Date()
                    .toISOString()
                    .substring(0, 10)


            addFilter(
                'dueDate',
                '<',
                today
            )


            addFilter(
                'status',
                '!=',
                'CLOSED'
            )

        }


        /*
        * =========================================================
        * 9. DUE IN N DAYS
        *
        * Example:
        *
        * Find work orders due in 3 days
        *
        * Today:
        * 2026-09-11
        *
        * Target:
        * 2026-09-14
        *
        * This means EXACTLY 2026-09-14.
        * =========================================================
        */

        const dueInMatch =
            q.match(
                /\bdue\s+in\s+(\d+)\s+days?\b/i
            )


        /*
        * =========================================================
        * 10. DUE WITHIN N DAYS
        *
        * Example:
        *
        * Find work orders due within 3 days
        *
        * Means:
        *
        * today <= dueDate <= today + 3 days
        * =========================================================
        */

        const dueWithinMatch =
            q.match(
                /\bdue\s+within\s+(\d+)\s+days?\b/i
            )


        if (dueInMatch) {

            const days =
                Number(
                    dueInMatch[1]
                )


            const targetDate =
                new Date()


            targetDate.setDate(
                targetDate.getDate() + days
            )


            const targetDateString =
                targetDate
                    .toISOString()
                    .substring(0, 10)


            addFilter(
                'dueDate',
                '=',
                targetDateString
            )


            addFilter(
                'status',
                '!=',
                'CLOSED'
            )

        }
        else if (dueWithinMatch) {

            const days =
                Number(
                    dueWithinMatch[1]
                )


            const today =
                new Date()


            const futureDate =
                new Date(today)


            futureDate.setDate(
                futureDate.getDate() + days
            )


            const todayString =
                today
                    .toISOString()
                    .substring(0, 10)


            const futureString =
                futureDate
                    .toISOString()
                    .substring(0, 10)


            addFilter(
                'dueDate',
                '>=',
                todayString
            )


            addFilter(
                'dueDate',
                '<=',
                futureString
            )


            addFilter(
                'status',
                '!=',
                'CLOSED'
            )

        }
        else if (
            q.includes('due soon')
        ) {

            /*
            * Default:
            * next 7 days
            */

            const days = 7


            const today =
                new Date()


            const futureDate =
                new Date(today)


            futureDate.setDate(
                futureDate.getDate() + days
            )


            const todayString =
                today
                    .toISOString()
                    .substring(0, 10)


            const futureString =
                futureDate
                    .toISOString()
                    .substring(0, 10)


            addFilter(
                'dueDate',
                '>=',
                todayString
            )


            addFilter(
                'dueDate',
                '<=',
                futureString
            )


            addFilter(
                'status',
                '!=',
                'CLOSED'
            )

        }


        /*
        * =========================================================
        * 11. TEXT SEARCH
        *
        * IMPORTANT:
        *
        * Date-based questions must NOT become text searches.
        *
        * Example:
        *
        * "Find work orders due in 3 days"
        *
        * MUST NOT become:
        *
        * title LIKE '%due in 3 days%'
        *
        * =========================================================
        */

        const isDateBasedRequest =
            isOverdueRequest ||
            dueInMatch ||
            dueWithinMatch ||
            q.includes('due soon')


        /*
        * Generic requests:
        *
        * Find a work order
        * Find work orders
        * Show all work orders
        * List work orders
        *
        * These should return WorkOrders without text search.
        */

        const genericWorkOrderRequest =
            /^(show|find|search|get|list)\s+(?:all\s+)?(?:the\s+)?(?:a\s+)?(?:work\s+orders?|orders?)\s*$/i


        if (
            !isDateBasedRequest &&
            !genericWorkOrderRequest.test(q)
        ) {

            /*
            * Examples:
            *
            * Find pump work orders
            * Search work orders about motor
            * Look for generator
            */

            const searchMatch =
                q.match(
                    /(?:find|search|look for|about)\s+(?:a\s+|an\s+|the\s+)?(?:work orders?\s+)?["']?(.+?)["']?$/i
                )


            if (searchMatch) {

                searchText =
                    searchMatch[1]
                        .trim()

            }

        }


        /*
        * =========================================================
        * 12. DESCRIPTION SEARCH
        *
        * Examples:
        *
        * description is motor
        * description contains pump
        * description like generator
        * =========================================================
        */

        const descriptionMatch =
            q.match(
                /description\s+(?:is|contains|like)\s+["']?(.+?)["']?$/i
            )


        if (descriptionMatch) {

            searchText =
                descriptionMatch[1]
                    .trim()

        }


        /*
        * =========================================================
        * 13. TITLE SEARCH
        *
        * Examples:
        *
        * title is pump
        * title contains motor
        * title like generator
        * search by title pump
        * =========================================================
        */

        const titleMatch =
            q.match(
                /(?:title\s+(?:is|contains|like)|search\s+(?:by\s+)?title)\s+["']?(.+?)["']?$/i
            )


        if (titleMatch) {

            searchText =
                titleMatch[1]
                    .trim()

        }


        /*
        * =========================================================
        * 14. SORTING
        * =========================================================
        */

        if (
            q.includes('latest') ||
            q.includes('newest') ||
            q.includes('recent')
        ) {

            orderBy = [
                {
                    ref: ['createdAt'],
                    sort: 'desc'
                }
            ]

        }
        else if (
            q.includes('oldest')
        ) {

            orderBy = [
                {
                    ref: ['createdAt'],
                    sort: 'asc'
                }
            ]

        }
        else if (
            q.includes('due date') &&
            (
                q.includes('ascending') ||
                q.includes('earliest')
            )
        ) {

            orderBy = [
                {
                    ref: ['dueDate'],
                    sort: 'asc'
                }
            ]

        }
        else if (
            q.includes('due date') &&
            (
                q.includes('descending') ||
                q.includes('latest')
            )
        ) {

            orderBy = [
                {
                    ref: ['dueDate'],
                    sort: 'desc'
                }
            ]

        }


        /*
        * =========================================================
        * 15. TOP N
        *
        * Examples:
        *
        * top 5 work orders
        * first 10 work orders
        * latest 5 work orders
        * =========================================================
        */

        const topMatch =
            q.match(
                /\b(?:top|first|latest)\s+(\d+)\b/i
            )


        if (topMatch) {

            limit =
                Number(
                    topMatch[1]
                )

        }


        /*
        * =========================================================
        * 16. BUILD CAP SELECT
        * =========================================================
        */

        let query =
            SELECT.from(WorkOrders)


        /*
        * =========================================================
        * 17. BUILD CQN WHERE EXPRESSION
        *
        * Example:
        *
        * status = OPEN
        * AND priority_code = HIGH
        * AND category_code = ELECTRICAL
        *
        * =========================================================
        */

        const where = []


        const addWhereExpression =
            (field, operator, value) => {

                if (where.length > 0) {

                    where.push('and')

                }


                where.push(
                    { ref: [field] },
                    operator,
                    { val: value }
                )

            }


        /*
        * Add all normal filters
        */

        for (const filter of filters) {

            addWhereExpression(
                filter.field,
                filter.operator,
                filter.value
            )

        }


        /*
        * =========================================================
        * 18. TEXT SEARCH CONDITION
        * =========================================================
        */

        if (searchText) {

            const escapedText =
                searchText
                    .replace(/'/g, "''")


            if (where.length > 0) {

                where.push('and')

            }


            where.push({

                xpr: [

                    { ref: ['title'] },

                    'like',

                    {
                        val:
                            `%${escapedText}%`
                    },


                    'or',


                    { ref: ['description'] },

                    'like',

                    {
                        val:
                            `%${escapedText}%`
                    }

                ]

            })

        }


        /*
        * =========================================================
        * 19. APPLY WHERE
        * =========================================================
        */

        if (where.length > 0) {

            query =
                query.where(where)

        }


        /*
        * =========================================================
        * 20. APPLY SORTING
        * =========================================================
        */

        if (orderBy.length > 0) {

            query =
                query.orderBy(orderBy)

        }


        /*
        * =========================================================
        * 21. APPLY LIMIT
        * =========================================================
        */

        if (limit) {

            query =
                query.limit(limit)

        }


        /*
        * =========================================================
        * 22. DEBUG LOGGING
        *
        * Keep this during testing.
        * You can remove it later.
        * =========================================================
        */

        console.log(
            '========================================'
        )

        console.log(
            'Work Order Question:',
            question
        )

        console.log(
            'Work Order Filters:',
            JSON.stringify(
                filters,
                null,
                2
            )
        )

        console.log(
            'Work Order Search:',
            searchText
        )

        console.log(
            'Work Order Query:',
            JSON.stringify(
                query,
                null,
                2
            )
        )

        console.log(
            '========================================'
        )


        /*
        * =========================================================
        * 23. EXECUTE QUERY
        * =========================================================
        */

        let orders


        try {

            orders =
                await cds.db.run(query)

        }
        catch (error) {

            console.error(
                'Work Order query failed:',
                error
            )


            return req.error(
                500,
                'Unable to retrieve Work Order data.'
            )

        }


        /*
        * =========================================================
        * 24. COUNT
        * =========================================================
        */

        if (isCountRequest) {

            return {

                answer:
                    `There are ${orders.length} matching work order(s).`

            }

        }


        /*
        * =========================================================
        * 25. NO RESULTS
        * =========================================================
        */

        if (
            !orders ||
            orders.length === 0
        ) {

            return {

                answer:
                    `I couldn't find any work orders matching your request.`

            }

        }


        /*
        * =========================================================
        * 26. LOAD MASTER DATA
        * =========================================================
        */

        const priorities =
            await cds.db.run(
                SELECT.from(Priorities)
            )


        const categories =
            await cds.db.run(
                SELECT.from(Categories)
            )


        /*
        * =========================================================
        * 27. CREATE PRIORITY MAP
        * =========================================================
        */

        const priorityMap =
            Object.fromEntries(
                priorities.map(p => [
                    p.code,
                    p.name
                ])
            )


        /*
        * =========================================================
        * 28. CREATE CATEGORY MAP
        * =========================================================
        */

        const categoryMapResult =
            Object.fromEntries(
                categories.map(c => [
                    c.code,
                    c.name
                ])
            )


        /*
        * =========================================================
        * 29. BUILD RESPONSE
        * =========================================================
        */

        const lines =
            orders.map(
                (order, index) => {

                    const priority =
                        priorityMap[
                            order.priority_code
                        ] ||
                        order.priority_code ||
                        'N/A'


                    const category =
                        categoryMapResult[
                            order.category_code
                        ] ||
                        order.category_code ||
                        'N/A'


                    const technician =
                        order.technician_code ||
                        'Unassigned'


                    const dueDate =
                        order.dueDate ||
                        'No due date'


                    return (

                        `${index + 1}. ${order.title}\n` +

                        `   Status: ${order.status}\n` +

                        `   Priority: ${priority}\n` +

                        `   Category: ${category}\n` +

                        `   Technician: ${technician}\n` +

                        `   Due Date: ${dueDate}`

                    )

                }
            )


        /*
        * =========================================================
        * 30. FINAL RESPONSE
        * =========================================================
        */

        return {

            answer:

                `I found ${orders.length} work order(s).\n\n` +

                lines.join('\n\n')

        }

    })
})