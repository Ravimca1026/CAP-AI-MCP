# Sales Agent

A CAP service exposed as an A2A agent with `@cap-js/agents`, plus a chat UI.

```
Browser UI
   |  JSON-RPC  POST /a2a/sales-agent   { method: "message/send" }
   v
@agent  (ReAct loop, LLM from cds.requires.llm)
   |  tools auto-derived from the service's entities and actions
   v
CAP handlers  (srv/sales-agent.js)
   |  cds.ql
   v
DB
```

Drafted by Claude. Review before use.

## Run it

```bash
npm install
cds watch
```

Look for this in the log:

```
[cds] - serving SalesAgent { at: [ ..., '/a2a/sales-agent' ] }
```

Then open either:

- `http://localhost:4004/a2a/sales-agent/preview/` — the chat preview the
  plugin ships. Zero code. Use it to confirm the agent works.
- `http://localhost:4004/chat/` — the custom UI in `app/chat/`.

In development the LLM is mocked, so replies are canned. That is enough to
build and debug the UI.

## Real LLM

Needs an SAP AI Core instance.

```bash
cds bind -2 <your-aicore-instance>
cds watch --profile hybrid
```

Model is set in `package.json` under `cds.requires.llm.model`.

## Layout

```
db/schema.cds                             domain model, doc comments feed the agent
db/data/*.csv                             seed data
srv/sales-agent.cds                       the @agent service, tool surface
srv/sales-agent.js                        handlers, guard rails, DB access
srv/sales-agent/AGENTS.md                 agent identity and system prompt
srv/sales-agent/skills/place-order/       workflow the agent follows to order
srv/chat-service.cds / .js                optional facade, hides JSON-RPC from the UI
app/chat/index.html                       chat UI, speaks A2A or the facade
```

The folder name `srv/sales-agent/` must match the slugified service name.
Service `SalesAgent` slugifies to `sales-agent`, which is also the served
path. If you rename the service, rename the folder and check the startup log.

## Two routes, one UI

The dropdown in the UI switches between:

- **Direct A2A** — the browser posts JSON-RPC to `/a2a/sales-agent`.
  Fewest moving parts. Needs an auth header in the browser.
- **CAP facade** — the browser posts to `/chat-api/ask`, a normal CAP
  action that forwards to the agent. Inherits CAP auth and CSRF. Better
  fit for a Fiori launchpad.

## Human in the loop

`createOrder` is annotated `@agent.hitl`. When the agent decides to call
it, the task stops at A2A state `input-required` instead of writing. The
UI shows Approve and Cancel. Approving sends a follow-up message carrying
the same `taskId`.

## Guard rails

- Narrow `@readonly` projections. The agent only sees these columns.
- `cds.query.limit` plus a `before('READ')` clamp. No full table pulls.
- `after('READ')` masks customer email for non-admins.
- `@requires: 'agent'` on the service, `@requires: 'admin'` on the write.
- Rejection messages are written for the model to read and retry.

## Mock users

| User  | Password | Roles          |
| ----- | -------- | -------------- |
| alice | (empty)  | agent, admin   |
| bob   | (empty)  | agent          |

## Before production

`@cap-js/agents` is alpha. Pin the version and read the CHANGELOG before
upgrading. The repo documents quota enforcement, audit logging, telemetry
and content filtering under `.docs/`. Read those first.

Every write should stay behind `@agent.hitl` until audit logging is in
place.
