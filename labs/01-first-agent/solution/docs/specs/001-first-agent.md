# Reference specification ? issue lookup

Status: reference implementation; creator walkthrough pending. Implements [the learner plan](../../PLAN.md).

## Goal and scope
Read ISSUE-001 from a fixed in-memory source and return its summary through a bounded model/tool loop. Ask for a missing ID. No external tracker/provider, network tool, shell tool, file tool, or retries. Host CLI output files are outside the agent's capabilities.

## Contracts and constraints
Task: optional issueId matching ISSUE- plus three digits, no extra fields. Role: name/responsibilities/context/allowedTools/completion/clarification, strict fields and known tool names. Model: strict tool_call or final response. Tool: registered get_issue, exactly one valid issueId argument. Results contain status, optional answer/question/error, steps, toolCalls, and sequenced trace.

Default limit 3; integer 1?5. Count each model call including final. Stop before extra call; accept final on last step. Deny unauthorized tools before handler invocation. Fail malformed task/role/config/model/arguments with the specified stable error. Fail thrown model/handler without leaking exception details or retrying. Unknown fixture issues fail. Copy model context to prevent permission mutation.

## Acceptance and implementation plan
1. Plan and instructions complete before source changes.
2. Write/run invalid-input, denied-tool, argument/output, thrown-error, and step-limit tests first.
3. Write/run missing-input, actual-tool-result, and final-at-limit success tests before implementing success.
4. Implement validation, dispatch, loop, trace and terminal results; run npm run typecheck and npm test.
5. Build CLI, run happy/malformed/denied/looping scenarios and missing input; compare artifacts/exit codes and independent acceptance results.
6. Reproduce the off-by-one defect after baseline, restore it, and rerun checks. Keep learner walkthrough and assistant-loading status separate.

No blocking implementation questions remain. Author evidence is in the course docs/evidence/stage-1 directory. The reference solution is not evidence that a learner performed these actions.
