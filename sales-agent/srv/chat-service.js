const cds = require('@sap/cds')

const AGENT_PATH = '/a2a/sales-agent'

module.exports = class ChatService extends cds.ApplicationService {

  async init () {

    this.on('ask', async req => {
      const { text, contextId, taskId } = req.data
      if (!text || !text.trim()) return req.reject(400, 'Message text is required.')

      const port = (cds.app && cds.app.server && cds.app.server.address() || {}).port || 4004
      const base = process.env.SELF_URL || `http://localhost:${port}`

      const message = {
        kind: 'message',
        role: 'user',
        messageId: cds.utils.uuid(),
        parts: [{ kind: 'text', text }]
      }
      if (contextId) message.contextId = contextId
      if (taskId) message.taskId = taskId

      const incoming = cds.context && cds.context.http && cds.context.http.req
      const auth = incoming && incoming.headers && incoming.headers.authorization

      let json
      try {
        const res = await fetch(base + AGENT_PATH, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Forward the caller's identity. Never escalate here.
            ...(auth ? { authorization: auth } : {})
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: cds.utils.uuid(),
            method: 'message/send',
            params: {
              message,
              configuration: { acceptedOutputModes: ['text/plain'], blocking: true }
            }
          })
        })
        json = await res.json()
      } catch (e) {
        return req.reject(502, `Agent endpoint unreachable: ${e.message}`)
      }

      if (json.error) return req.reject(502, json.error.message || 'Agent error')

      const r = json.result || {}
      const parts = [
        ...(r.parts || []),
        ...((r.status && r.status.message && r.status.message.parts) || []),
        ...(r.artifacts || []).flatMap(a => a.parts || [])
      ]

      return {
        reply: parts.filter(p => typeof p.text === 'string').map(p => p.text).join('\n\n'),
        data: JSON.stringify(parts.filter(p => p.kind === 'data').map(p => p.data)),
        state: (r.status && r.status.state) || 'completed',
        taskId: r.id,
        contextId: r.contextId || contextId
      }
    })

    await super.init()
  }
}
