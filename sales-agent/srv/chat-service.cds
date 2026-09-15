// Optional facade. Lets a UI talk to the agent with a normal CAP action
// instead of raw JSON-RPC, inheriting CAP auth and CSRF handling.

@path: '/chat-api'
@requires: 'agent'
service ChatService {

  action ask (
    /** The user's message. */
    text      : String,
    /** Conversation id returned by a previous call. Omit on the first turn. */
    contextId : String,
    /** Task id to resume. Send this when approving a paused task. */
    taskId    : String
  ) returns {
    reply     : String;
    /** JSON string holding any structured data parts returned by the agent. */
    data      : LargeString;
    /** A2A task state: submitted, working, input-required, completed, failed, canceled. */
    state     : String;
    taskId    : String;
    contextId : String;
  };
}
