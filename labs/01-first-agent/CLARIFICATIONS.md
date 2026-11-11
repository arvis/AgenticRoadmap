# Stakeholder answers

Use these after writing your own clarification questions. The answers are available without an assistant or instructor.

| Question | Answer |
| --- | --- |
| Where are issues? | A supplied in-memory fixture in `src/fixture.ts`; no external tracker. |
| Input? | An object with optional `issueId`. If present it must match `ISSUE-` plus exactly three digits. Extra task fields are invalid. |
| Missing ID? | Return `NEEDS_INPUT` and a question, with zero model/tool calls. |
| Known issue? | `ISSUE-001`, title `Repair the build`, status `open`, description `The build fails because a required type is missing.` |
| Summary? | The scripted happy model uses returned fixture data and includes the issue ID. Final responses contain 1?500 trimmed characters. |
| Tool? | Only registered `get_issue`, with exactly `{issueId: valid ID}`; empty role allowlist denies it. Unknown role capabilities invalidate configuration. |
| Role? | `name`, `responsibilities`, `context`, `allowedTools`, `completion`, `clarification`; reject extra fields. Read it from `role.json` in the CLI. |
| Responses? | `{type: 'tool_call', name, input}` or `{type: 'final', text}`. Reject other shapes/extra fields. Tool arguments are validated separately. |
| Errors? | `INVALID_TASK`, `INVALID_ROLE`, `INVALID_RUN_CONFIG`, `INVALID_MODEL_OUTPUT`, `MODEL_FAILED`, `INVALID_TOOL_INPUT`, `TOOL_DENIED`, `TOOL_FAILED`, or `STEP_LIMIT`. Stop immediately; no retry or raw exception text. |
| Limits? | Default 3 model calls, including final responses; caller can choose integer 1?5. Stop before an extra call; a final response on the last allowed call succeeds. |
| Tool counts? | Actual handler invocations, including a handler that throws. Rejected requests do not invoke it. |
| Outputs? | `status`, optional `answer`/`question`/`error`, `steps`, `toolCalls`, ordered `trace` with 1-based `sequence`, `event`, `detail`. Identical inputs/config yield identical JSON. |
| Trace? | Valid decisions use `model`, permitted dispatch `tool_allowed`, returned data `tool_result`, denial `tool_denied`, and final status/error `terminated`. No fabricated times/tokens/cost. |
| Permissions? | Runtime checks control dispatch. Model context is copied so changing role prose/data does not grant capabilities. Host CLI artifact writing is not an agent tool. |
| Production? | No. Passing fixture tests proves only tested local behavior. Follow employer review/release rules before production main. |

Use the [course specification](../../docs/specs/001-stage-1.md) for exact runtime boundaries and the required test matrix. Learner paths are relative to the copied learner project.
