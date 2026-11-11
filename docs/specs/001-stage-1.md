# 001 — Stage 1: plan, test, and run a first agent

Status: implementation checked locally; creator learner walkthrough pending. See [actual evidence and criterion status](../walkthroughs/stage-1.md).
Language decision: TypeScript on Node.js selected for the requested implementation.
Created: 2026-11-11.
Development branch: `spec/001-stage-1`.

## 1. Goal and plan references

Deliver a complete, standalone Stage 1 exercise package that the creator can follow as the first learner before the website is built. The learner finishes a task plan and specification, writes repository instructions, writes unhappy-path tests before implementation, and builds and runs a small TypeScript tool-using agent with deterministic mock responses.

Implements [Stage 1](../../PLAN.md#stage-1--specify-a-task-and-run-the-first-agent), [the exercise quality bar](../../PLAN.md#7-portfolio-evidence-and-quality-bar), and Phase 0 of [the delivery phases](../../PLAN.md#8-delivery-phases). Follow the [repository working instructions](../../AGENTS.md).

This document specifies work on the course. The learner will separately author `docs/specs/001-first-agent.md` inside their exercise project. Do not confuse the two specifications.

## 2. Scope and exclusions

In scope:

- Five practical lessons covering planning, repository instructions, test-first development, the agent/tool loop, and verification with a controlled failure and repair.
- A learner task brief, supplied project plan, templates, an unfinished but executable starter, and a separate reference solution.
- One read-only tool, one explicit role configuration, scripted mock scenarios, structured results, and execution limits.
- Meaningful behavior tests, independent acceptance checks, expected outputs, troubleshooting, and a creator walkthrough record.
- A local Git checkpoint after the learner finishes the required checks, and a committed authoring checkpoint when the Stage 1 package itself is verified.
- Tool-neutral instructions and optional coding-assistant setup notes. Manual completion must work.

Out of scope:

- Website implementation, roadmap UI, progress storage, root application scaffolding, and later-stage lessons.
- A course-specific VS Code extension or other editor integration; the extension is a [later goal](../../PLAN.md#19-later-goal--optional-vs-code-extension).
- Paid services, provider credentials, live inference, model quality/cost benchmarks, and an agent framework.
- MCP, persisted/resumable state, multi-agent orchestration, automatic repairs, and a software factory.
- Learner branch-per-spec, merge, or conflict exercises; these begin in Stage 4.
- Shell tools, arbitrary filesystem tools, network tools, write tools, and production-security claims.

## 3. Learner task and planning readiness

Start with this deliberately incomplete request:

> Build an assistant that looks up a project issue and gives me a short summary.

Supply a small learner `PLAN.md` establishing the project purpose, TypeScript/mock-mode constraints, and the broad intended behavior. Supply a clarification worksheet containing stakeholder answers that settle this exercise's requirements. A manual learner must not need an assistant or access to the course creator to resolve the brief.

The learner must read the plan, identify ambiguities, use the clarification worksheet, and complete `docs/specs/001-first-agent.md` before writing tests or implementation code. The worksheet must settle:

- The source is a supplied in-memory issue fixture, with no external issue tracker.
- A valid issue ID such as `ISSUE-001` produces a short summary containing that ID.
- A missing ID results in a request for clarification; a malformed ID is rejected.
- The agent may call only the registered read-only `get_issue` tool when its role permits it.
- Invalid tool arguments, denied tools, malformed model output, tool failure, and exhausted limits stop the run with inspectable evidence.
- Success and failure are checked through structured outputs and deterministic tests.

The planning template must cover scope/exclusions, inputs/outputs, constraints, failure behavior, role responsibilities, implementation steps, and numbered acceptance criteria linked to verification steps. Include a readiness checklist and an explicit record of when it was completed. Any unresolved blocking question keeps planning incomplete. A later behavior change requires updating affected planning before implementation continues.

Detailed planning is for this bounded task; it does not require fully specifying future stages. Planning readiness is a recorded workflow checkpoint, not a claim that Markdown can technically prevent code changes.

## 4. Deliverables and file boundaries

Implemented file boundaries (the walkthrough record explicitly separates author evidence from pending creator work):

```text
content/stage-1/
  01-plan-before-code.mdx
  02-repository-instructions.mdx
  03-unhappy-path-tests-first.mdx
  04-run-the-agent.mdx
  05-inspect-break-and-repair.mdx
labs/01-first-agent/
  README.md
  TASK.md
  CLARIFICATIONS.md
  expected/                       Hand-authored, clearly labeled examples
  checks/acceptance.mjs            Black-box checks against a completed project
  starter/
    PLAN.md
    docs/specs/001-first-agent.md  Unfilled planning template
    docs/planning-readiness.md     Checklist template
    docs/test-evidence.md          Failing/passing evidence template
    docs/tool-session.md           Optional assistant-loading evidence template
    AGENTS.md                     Learner instruction template
    package.json
    package-lock.json
    tsconfig.json
    src/                          Contracts and explicit unfinished entry points
    test/                         Test-writing guidance; no solved behavior suite
  solution/
    ...                           Independent completed reference project
docs/walkthroughs/stage-1.md       Actual creator walkthrough and limitations
```

Both starter and solution are independently installable with locked dependencies and no root workspace/website/global compiler dependency. The selected language/runtime is TypeScript on Node.js with Zod and Vitest; see [the language decision](../adr/0001-console-app-language.md). Author checks used Windows, Node 24.11.0, npm 11.6.1, TypeScript 7.0.2, Zod 4.6.7, Vitest 5.1.0, and Node types 24.19.2. Other environments are unverified. No course-specific editor extension is required.

Starter contracts and placeholder exports must compile so learners can write behavior tests without missing-import failures. The unfinished agent may return a structured `NOT_IMPLEMENTED` failure; it must not contain the finished control flow, validation logic, role policy, or passing behavior tests. An assertion comparing the specified behavior with `NOT_IMPLEMENTED` can demonstrate missing behavior; a broken harness cannot.

The solution contains completed planning, instructions, role configuration, source, and tests. Hand-authored expected outputs are examples, not captured run evidence. Separate actual walkthrough output from examples.

Each lesson must have a concrete task, prerequisites, an initially estimated duration labeled unvalidated, numbered actions, files to change, exact commands, expected observations, acceptance checks, and troubleshooting. Put short explanations beside the action that needs them. Use portable Markdown/MDX without website-specific components so the lessons are readable before the web application exists.

## 5. Tool-neutral repository instructions

Have the learner complete shared working rules in `AGENTS.md`, or use the selected tool's supported instruction mechanism. Include:

- Read `PLAN.md` and the relevant task specification before work.
- Finish planning and resolve blocking questions before writing tests or implementation.
- Write unhappy-path tests first, observe their intended failures, then write happy-path tests before implementing successful behavior.
- Implement minimally, rerun checks, refactor, and report actual results.
- End each completed stage with a scoped local Git commit and retain/report the commit hash after the required checks pass.
- Project layout, real setup/check commands, review expectations, permitted actions, and company-policy references.

Provide optional tool-specific setup notes linked to current official documentation. Show a thin `CLAUDE.md` import adapter where appropriate instead of duplicating the shared rules. Explain that `CODEX.md` is not Codex's default filename, using the existing [tool-convention guidance](../../PLAN.md#17-repository-instructions-for-coding-agents). No tool-specific command or paid subscription is a prerequisite for the core lab.

In an available, approved assistant, record its version, active instruction sources, the method used to inspect loading, a bounded task, and the resulting diff/check evidence. An assistant's assertion that it read a file is not, alone, proof that its automatic discovery loaded that file. If reliable loading evidence is unavailable, record that limitation. If no assistant is available, complete the core lab manually and mark this optional session check unverified.

The custom lab explicitly loads its role configuration. It does not automatically inherit a coding assistant's repository-instruction discovery. Written guidance is distinct from the runtime controls below.

## 6. Runtime contract

Implementation decisions settled before coding: use synchronous injected model/tool functions, strict Zod objects, and a result with `status`, optional `answer`/`question`/`error`, `steps`, `toolCalls`, and sequenced `trace`. The role is supplied as parsed JSON by the CLI, not discovered by the agent. Model responses use `{type: "tool_call", name, input}` or `{type: "final", text}`; provider throws map to `MODEL_FAILED`. Final text is nonempty and at most 500 characters. Invalid CLI options fail before executing or writing an artifact. CLI artifacts are an explicit trusted host operation, not an agent write capability. Dependency installation can require network; a verification-only Node preload guard will disable standard Node network APIs for the recorded offline run, with its limits stated. The creator walkthrough remains a separate human activity.

### Task and role

The task input contains an optional `issueId`. Present IDs must match `ISSUE-` followed by three digits. Missing input returns `NEEDS_INPUT` with a question and no model/tool calls; invalid input returns `FAILED` with `INVALID_TASK` and no model/tool calls. Valid but unknown IDs are handled as tool failures.

Use a small fixed fixture containing `ISSUE-001` with a title, status, and description. Load trusted fixture data locally; the model cannot supply a file path or substitute a fixture source.

The developer-authored role configuration contains a name, responsibilities, context description, allowed tools, and rules for completion/clarification. Validate its structure, reject unknown fields, and validate allowed tools against the fixed runtime registry. An empty allowed-tool list is valid and denies all tool use. Unknown registered capabilities in configuration cause `INVALID_ROLE` before calls begin. Role prose is guidance; tool membership is checked by runtime code.

### Mock model and tool boundary

Use a minimal scripted model adapter with structured responses: a tool call or a final answer. The model receives the task, role, and prior tool results. Validate each response and reject unknown fields or unsupported response shapes with `INVALID_MODEL_OUTPUT`.

The only registered tool is `get_issue`, accepting an object containing only a valid `issueId`. Check tool authorization and argument validation before invoking the handler:

- An unknown or disallowed tool returns `TOOL_DENIED`; no handler is called.
- Malformed arguments return `INVALID_TOOL_INPUT`; no handler is called.
- A missing fixture issue or thrown handler error returns `TOOL_FAILED`; no automatic retry occurs and raw exception details are not emitted.
- An allowed valid request returns only the fixture's issue data.

The mock model cannot register tools, change role permissions, change limits, or execute text returned by a tool. Use handler spies/counters to verify non-execution, rather than trusting a denial message in the trace.

### Execution limit and results

Count one step per model-adapter call, including a final-answer call. Default `maxSteps` is 3, configurable by trusted caller input to an integer from 1 through a hard ceiling of 5. Invalid limits produce `INVALID_RUN_CONFIG` before any model/tool call. Validate the role before starting the model loop.

Stop before attempting call `maxSteps + 1`. If no final answer has been returned after the permitted calls, return `FAILED` with `STEP_LIMIT`. A final answer returned on the last permitted call succeeds. A denied/invalid/failed tool request stops immediately; do not continue to a scripted final answer afterward.

Each result includes status (`COMPLETED`, `NEEDS_INPUT`, or `FAILED`), answer/question when applicable, error code on failure, step count, tool-call count, and an ordered trace. The tool-call count measures actual handler invocations. Trace model decisions, tool decisions/results, and termination with sequence numbers. Do not invent timings, token usage, or cost. Identical fixture/configuration runs must yield identical result JSON; keep walkthrough dates/environment in separate evidence files.

This bounded synchronous mock loop demonstrates step limits. It does not establish timeout, process-isolation, prompt-injection robustness, or real-model reliability guarantees; those are addressed in later stages.

## 7. Scenarios and command contract

Both project variants expose these commands. The starter remains deliberately unfinished until the learner implements it:

| Command from the project root | Required behavior |
| --- | --- |
| `npm ci` | Install locked local development dependencies; initial package acquisition may require network access |
| `npm run check:setup` | Verify the documented runtime and harness prerequisites without claiming agent behavior is implemented |
| `npm run typecheck` | Check TypeScript contracts and source |
| `npm run build` | Compile the CLI and source |
| `npm test` | Run behavior tests once without watch mode |
| `npm run demo -- --scenario happy --issue ISSUE-001` | One valid tool invocation and a final answer: 2 model steps, 1 tool call |
| `npm run demo -- --scenario malformed --issue ISSUE-001` | Mock requests invalid tool arguments; fail with `INVALID_TOOL_INPUT` and 0 tool calls |
| `npm run demo -- --scenario denied --issue ISSUE-001` | Mock requests an unregistered write tool; fail with `TOOL_DENIED` and 0 tool calls |
| `npm run demo -- --scenario looping --issue ISSUE-001` | Mock repeatedly requests the allowed tool; stop with `STEP_LIMIT` after 3 steps and 3 tool calls |
| `npm run demo -- --scenario happy` | Ask for the missing issue ID with 0 model/tool calls |

The CLI emits the result as JSON and saves the same result in a fixed project-local `artifacts/<scenario>.json`. The scenario must be selected from a fixed allowlist; do not accept arbitrary output paths. Distinguish `NEEDS_INPUT` from a completed task. Exit 0 for completed/clarification outcomes and nonzero for failed runs. Document intentional failure exits so learners do not mistake them for setup problems. The starter returns the explicitly unfinished result until the learner implements it.

After dependencies are acquired, tests, builds, demos, and acceptance checks must work without network access, credentials, or a running assistant. Do not equate a fresh dependency installation with offline execution. npm may print script banners; the acceptance runner must invoke the built CLI directly when parsing JSON.

## 8. Test-first sequence and required cases

Finish planning first. Establish a working harness using the supplied contracts/placeholders. Write the unhappy-path behavior tests and run them before implementing the controls; retain assertion failures that identify the missing behavior. Then add and run happy-path tests before implementing successful control flow. Implement minimally, run the full suite, and refactor with checks remaining green.

For every required case, assert the observable result and relevant call counts. Use an injected scripted adapter and instrumented tool handler; tests must not merely compare a fixture file with itself.

| Order | Case | Required observation |
| --- | --- | --- |
| Unhappy | Malformed task or invalid run limit | Stable error and 0 model/tool calls |
| Unhappy | Invalid role configuration | `INVALID_ROLE` and 0 model/tool calls |
| Unhappy | Unknown/disallowed tool; role permits no tools | `TOOL_DENIED`, handler not invoked, run stops |
| Unhappy | Malformed tool arguments, including extra fields | `INVALID_TOOL_INPUT`, handler not invoked |
| Unhappy | Malformed model response | `INVALID_MODEL_OUTPUT`, no tool dispatch |
| Unhappy | Unknown issue or handler throws | `TOOL_FAILED`, no retry, no leaked raw exception |
| Unhappy | Repeated tool calls without a final answer | Exactly the configured calls, then `STEP_LIMIT`; no extra adapter call |
| Happy | Missing issue ID | `NEEDS_INPUT` with a question and 0 calls |
| Happy | Valid permitted lookup followed by final answer | Fixture used, answer contains the requested ID, expected trace and counts |
| Happy | Final answer at the limit | Completes without an unnecessary additional call |

Maintain `docs/test-evidence.md` in the learner copy with command, stage of work, observed failing assertion, the subsequent change, and passing output. Preserve enough context to identify the tested code version or snapshot. Never reconstruct claimed pre-implementation output after the implementation is finished.

For the separate failure/repair exercise, after reaching a passing baseline deliberately introduce an off-by-one limit defect, run the relevant existing test and looping scenario, inspect their evidence, restore the correct boundary, and rerun checks. No new production behavior is added in this exercise. Keep its evidence distinct from the original test-first record.

## 9. Acceptance criteria

| ID | Requirement | Required evidence |
| --- | --- | --- |
| S1-01 | Planning is complete before learner tests or implementation | Filled learner specification and dated readiness record; walkthrough sequence |
| S1-02 | Shared instructions contain plan-first, unhappy-path-first, evidence, and company-policy rules | Document inspection; optional assistant-loading check independently labeled |
| S1-03 | Every lesson has an executable task and checkable output | Five lesson files and walkthrough checkpoints |
| S1-04 | Starter can run/typecheck with explicit unfinished behavior and no solved behavioral suite | Clean setup/build record; acceptance checks correctly reject it as incomplete |
| S1-05 | Unhappy-path tests precede implementation and happy-path tests precede successful behavior | Actual failing/passing evidence from the creator's learner copy |
| S1-06 | Runtime validates task, role, model output, tool authorization, and arguments | Tests for every required case and handler non-execution assertions |
| S1-07 | Step limit has exact, documented boundary behavior | Limit-exhaustion and final-step-success cases; model/tool counts |
| S1-08 | Demo scenarios produce stable JSON results and correct exit codes | Actual CLI outputs/artifacts for all documented scenarios, repeated-run comparison |
| S1-09 | Acceptance checks assess completed behavior independently of learner-written tests | Black-box runner against the solution and the creator's completed learner copy; starter fails |
| S1-10 | Controlled defect is reproduced and repaired without weakening checks | Baseline, failing defect run, and repaired passing record |
| S1-11 | Core exercise works offline after dependency acquisition and without assistant/provider access | Actual no-network run of typecheck/build/tests/demos/acceptance; environment details |
| S1-12 | Creator completes the instructions from a fresh starter copy | Walkthrough links learner-authored artifacts, results, fixes to instructions, and limitations |
| S1-13 | Completed Stage 1 work has local Git checkpoints and distinguishes progress from production promotion | Learner hash recorded in walkthrough/completion evidence; author implementation commit/local-main integration reported after engineering checks; full-stage checkpoint includes completed walkthrough evidence |

No acceptance row is passed merely because its evidence file exists. Check the recorded observations and link them to the relevant artifacts. Session instruction-loading can remain explicitly unverified on the manual path without blocking core completion; do not report it as verified in that case.

## 10. Implementation order

1. Select the existing TypeScript/Node design under the implementation request, then finalize the brief, clarification worksheet, lesson actions, contract, and acceptance expectations before coding. Keep unobserved results labeled as such.
2. Set up standalone package tooling, types, unfinished entry points, and evidence/planning templates. Verify setup before behavior work.
3. Write and run reference unhappy-path tests, then happy-path tests, before implementing the corresponding runtime behavior. Record actual failures.
4. Implement validation, the fixed tool registry, role checks, the bounded mock loop, result/trace handling, and the CLI. Run checks and refactor.
5. Add independent acceptance checks, run them against solution/starter, and document the controlled defect/repair exercise. Verify that expected starter failure is distinguishable from a harness error.
6. Finish the five lessons with exact commands, expected outputs, troubleshooting, and optional assistant setup notes. Check current official references when writing tool-specific instructions.
7. Commit and merge the scoped author implementation into local `main` after its required engineering checks/reviews pass, verify integration, and report the hashes. Keep the pending creator walkthrough explicitly unverified.
8. Have the creator complete the course sequence in a fresh learner copy, including the original test-first sequence, defect/repair, and actual offline verification. Agent implementation checks do not substitute for this learner walkthrough. Have the learner commit the completed exercise after its checks pass and record that hash in completion evidence.
9. Record the creator walkthrough, fix instructions, and update acceptance status, the index, and devlog. Commit/integrate final evidence or corrections after their relevant checks. Report the full-stage checkpoint only when the required walkthrough is complete. Keep unobserved checks unverified and stop before website implementation.

## 11. Verification procedure

For starter, solution, and the creator's learner copy, record actual Node/npm versions and relevant operating-system details. From a fresh directory with no inherited `node_modules`, acquire dependencies using `npm ci`, then run setup, typecheck, and build checks. Capture expected starter incompleteness separately from completed-project results.

Run tests on the solution and completed learner copy. Run each scenario from section 7, checking stdout, saved JSON, status, error code, trace, counts, and exit code. The independent runner will accept one explicit local project-root argument, validate the target layout, and use the built CLI without shell interpolation. Document invocation as `node checks/acceptance.mjs <project-root>` from `labs/01-first-agent/`; `starter` and `solution` are the initial targets. It must not modify source or accept model-supplied commands.

Repeat completed runs to compare deterministic JSON. Perform the controlled defect/repair sequence. Disconnect or disable network access using an appropriate local mechanism, record how this was done, and rerun checks/demos with cached dependencies and no credentials. Source inspection alone does not prove the no-network run. No paid-provider calls are permitted for this exercise.

Check lesson links and expected-output labels. Record all outcomes in `docs/walkthroughs/stage-1.md` with links to retained artifacts. If the creator walkthrough or any mandatory runtime check is pending, the exercise remains unverified.

End the learner instructions with a basic local commit checkpoint: inspect `git status` and `git diff`, stage only the intended source/planning/instruction/test/evidence files, inspect the staged diff, and commit after all required checks pass. Provide local Git initialization/configuration guidance only if needed for a fresh learner project. Exclude installed dependencies and generated build output. Record the resulting hash using `git rev-parse HEAD`. This checkpoint does not require a merge or remote push and does not establish production readiness. Explain that production `main` receives only production-ready changes after company-required checks and approvals; practical branching/merging starts in Stage 4. The walkthrough must retain the learner checkpoint hash; the author's reports must distinguish implementation integration from the final verified course-package checkpoint.

## 12. Branch, dependencies, and current evidence

Use development branch `spec/001-stage-1` for this specification and its future implementation. At initial specification authoring, the repository had no commits and existing untracked planning files were preserved; that was the initial state, not a standing description of current history. Inspect the current Git state before implementation. Commit the scoped implementation and merge into local `main` after required engineering checks/reviews pass, then verify integration. Preserve unrelated changes and report pending creator walkthroughs separately. Follow [company and repository integration policy](../../PLAN.md#18-one-specification-per-branch-and-verified-integration); this authoring workflow is separate from the learner's production-readiness rule.

The implementation uses the agreed project plan, shared instructions, and selected TypeScript/Node design, without depending on the website or later stages. Versions and observed support are recorded above. Website work, a VS Code extension, and remote publication are outside this task.

Current evidence:

- Five lessons, task/clarification worksheets, starter/solution packages, scripts, tests, and independent checker implemented.
- Author red/green, controlled defect/recovery, CLI results, clean installs, and guarded-network checks recorded in [the evidence index](../evidence/stage-1/README.md).
- Final author suite: 50 tests passing; independent solution acceptance: 16 checks passing; starter is correctly rejected as incomplete.
- Creator learner walkthrough, learner-authored test history/checkpoint, and fresh assistant-loading experiment: pending.
- See [criterion-level status](../walkthroughs/stage-1.md); implementation checks do not establish full course-stage verification.
