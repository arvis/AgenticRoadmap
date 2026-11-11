# From Developer to Agentic Developer — PLAN.md

## 1. Project intent
Build an open-source, hands-on course with an interactive learning roadmap for experienced software developers transitioning into **Agentic Developers**. Learners write specifications, configure agent roles and tools, implement safeguards, run workflows, inspect failures, and verify results.

The creator, an experienced Java/backend developer transitioning toward Agentic Engineering, is the first learner: create each exercise, complete it from the learner starting point, record actual results, and improve the instructions before publishing it. A working course and the completed exercises also serve as a **career portfolio artifact**.

The repository will contain the public source of the website, course materials, and runnable labs. Develop privately until the first vertical slice is usable, then prepare it for public release.

**Not in scope for v1:** general beginner programming lessons, paid checkout, LMS complexity, certificates, accounts, production cloud hosting dependencies, and a course-specific VS Code extension.

## 2. Audience and learning promise
Audience: developers already comfortable with programming, APIs, testing, Git, and backend concepts. No need to explain variables, loops, or HTTP basics.

After completing the roadmap, a learner should be able to:
1. Finish planning a bounded task before implementation, write its specification, and develop behavior through failing tests starting with unhappy paths.
2. Write repository instructions, verify their loading in the selected coding tool, configure an agent role with explicit responsibilities and permissions, and implement a tool-using agent in TypeScript.
3. Build and consume a small MCP server with enforced access boundaries.
4. Persist state, reproduce failures, and implement bounded recovery.
5. Run single-agent and multi-agent workflows on the same task and compare actual results.
6. Build evaluation suites, inspect traces, and repair a failing workflow.
7. Test safeguards against unauthorized actions, injected instructions, and runaway execution.
8. Complete and demonstrate a capstone from specification through verified results.

## 3. Product experience
A responsive, polished **roadmap.sh-inspired** visual learning map with its own identity, not a copy of roadmap.sh assets or layout. Main route flows through connected nodes. Each node opens a side panel or detail page containing:
- A concrete task and the artifact the learner will produce
- Prerequisites, expected time, setup commands, and a known starting state
- Numbered actions: write or change something, run it, inspect the result
- Starter files, runnable TypeScript code, and commands to check the result
- Acceptance criteria, expected outputs, and troubleshooting steps
- A controlled failure to reproduce and fix
- A short explanation beside the action that needs it, with optional references
- GitHub source link, a separate reference solution, and a place to record results
- Local completion toggle

The UI should support keyboard navigation, mobile layout, readable contrast, and progress visualization. Use a tasteful dark theme, clear typography, restrained gradients, and accessible node states.

No standalone theory-only lessons in v1. Every node must require a learner action and an observable result. Specifications, roles, context, safeguards, and human review are practiced throughout the course.

Keep the development workflow independent of the coding assistant. Teach common artifacts and observable checks first, with optional setup notes for individual tools. Learners can use a company-approved assistant or complete the coding steps manually; no particular assistant, paid subscription, or vendor-specific planning mode is required.

## 4. Learning roadmap (first release)

### Stage 1 — Specify a task and run the first agent
**Plan first:** start with a vague request and the learner project's supplied `PLAN.md`. Resolve missing requirements and derive `docs/specs/001-first-agent.md` covering scope, inputs, outputs, constraints, acceptance criteria, failure behavior, implementation steps, and verification. These paths are relative to the learner project. Finish the project planning needed for this task and its detailed specification before writing tests or implementation code. Record that scope, expected behavior, constraints, checks, and blocking questions are settled. Plan later tasks in detail when they are reached; revise affected planning before continuing if requirements change.
**Repository instructions exercise:** put the plan-first and tests-first workflow in the instruction file recognized by the selected coding assistant. Use `AGENTS.md` as the shared course example and show a thin `CLAUDE.md` adapter where needed. Include links to the plan/specifications, project layout, real commands, conventions, review expectations, and action boundaries. Verify loading in the chosen tool and inspect its behavior on a bounded task; record tool/version and evidence. If unavailable, mark this tool-specific check unverified and continue the tool-neutral exercise manually. Offline mock tests do not verify a coding tool's instruction loading.
**Tests first, unhappy paths first:** after planning is complete, write tests for malformed input, denied tools, and exceeded step limits before implementing the behavior. Run them and capture failures for the expected behavioral reasons; setup, import, or harness errors are not evidence of the intended failure. Add happy-path tests for a valid tool call and successful completion before implementing those behaviors. Implement the smallest change that makes each test pass, then refactor and rerun the relevant checks. Configure the role's responsibilities, context, permissions, and stopping conditions as specified and build the minimal TypeScript agent with deterministic mock mode.
**Verify:** retain the failing-then-passing test evidence, run acceptance checks, and inspect the tool trace. Confirm invalid requests and exhausted limits stop as specified. Treat role instructions as guidance; runtime checks enforce permissions.
**Produce:** completed task plan/specification, repository instructions containing the workflow, instruction-loading evidence or an explicit unverified status, unhappy-path and happy-path tests with actual failing/passing results, role configuration, agent code, and a saved run result.
**Checkpoint:** after the stage's required checks pass, inspect the diff and create a local Git commit of the completed learner work. Record the commit hash with the completion evidence. This basic save point applies from Stage 1; branch-per-spec and merge exercises still begin in Stage 4.

### Stage 2 — Tools, APIs and MCP
**Do:** build a read-only MCP server for local project metadata, connect a client, define tool schemas, and restrict access to a fixture directory. Supply repository instructions and project context to the agent.
**Verify:** call an allowed tool, reject malformed input and access outside the fixture directory, and confirm instructions embedded in tool output cannot authorize another tool or expand permissions.
**Produce:** runnable server and client, context files, and allowed/denied access tests.

### Stage 3 — Stateful agents
**Do:** build an issue-triage agent over local fixtures; save task state, select relevant context, and implement bounded retries, timeouts, cancellation, and protection against duplicate actions.
**Verify:** interrupt and resume a run, inject a tool failure, exhaust the retry limit, and replay an action without duplicating its effect. Inspect saved state to diagnose and repair a failed run.
**Produce:** resumable workflow, state records, failure fixtures, and recovery tests.

### Stage 4 — Orchestration and multi-agent design
**Do:** complete a constrained repository change with one agent, then configure planner, implementer, and reviewer roles for the same task, forming a small software factory workflow. Define each role's inputs, outputs, tool permissions, handoff checks, and escalation conditions. Run changes in a disposable workspace and require human review before applying them to the target project.
**Verify:** reject an incomplete handoff, prevent a reviewer from editing files, and catch a seeded defect using acceptance checks. Compare task results, calls, and elapsed time against the single-agent run.
**Branch and integration exercise:** create a dedicated branch for each of two small specifications. Keep each specification, implementation, tests, and supporting documentation together on its branch. Inspect the diffs, run required checks, and integrate the branches in dependency order into a disposable lab integration branch through the required review process. Reproduce a controlled merge conflict, resolve it against both specifications, and rerun affected checks on the integrated result. Remind learners that production `main` receives only production-ready changes after company-required checks and approvals; completing a lab or obtaining an agent approval does not establish that readiness. Follow company policy for branch naming, required reviewers, protected branches, release targets, and merge strategy.
**Produce:** executable role configurations, checked handoffs, specification branches, review evidence, integrated-result checks, and a single-agent/factory comparison record.

### Stage 5 — Evaluations and observability
**Do:** turn earlier acceptance criteria and failure fixtures into a repeatable evaluation runner. Save JSON results and traces; report success rate, latency, calls, and token usage/cost when available.
**Verify:** introduce a regression, locate its cause in the trace, fix it, and rerun the same cases. Compare two configurations using identical tasks and checks.
**Produce:** evaluation dataset, runner, failing and repaired run records, and a comparison report. Label mock measurements explicitly; measure model quality and provider cost only from actual model runs.

### Stage 6 — Test and harden safeguards
**Do:** harden the earlier workflow with a restricted execution environment, secret filtering, request limits, and human approval before a simulated write action. Bind approval to the exact proposed action and validate it again before execution. Use fixtures and disposable files for adversarial exercises.
**Verify:** attempt an unauthorized write, inject instructions through retrieved content, supply a fake secret, trigger repeated tool calls, deny approval, and change an action after approval. Confirm each case is blocked, redacted, or stopped as specified, and inspect the audit record.
**Produce:** enforced controls, adversarial tests, audit records, and a short threat model mapping each tested risk to its control. Record remaining limitations; these exercises do not establish production readiness.

### Stage 7 — Capstone
**Do:** write a specification and complete a compact Agentic Developer workflow using roles, tools, state, evaluations, safeguards, and human review. Start from the supplied scaffold and task brief; use the reference solution only after attempting the exercise.
**Verify:** run from a clean setup, demonstrate a successful task and a blocked unsafe action, recover from a failure, and present the resulting artifacts and evaluation report.
**Produce:** capstone source, specification, role configurations, tests, run records, and a reproducible demo. Link to the existing **Agentic Factory** repository as an optional advanced case study; do not duplicate or rewrite that project by default.

## 5. Technical architecture
**Preferred stack:** TypeScript, Next.js App Router, React, Tailwind CSS, MDX for educational content, Zod for validation, Vitest for unit tests, Playwright for UI smoke tests, GitHub Actions for CI.

**Console-app language proposal:** TypeScript running on Node.js, consistent with the existing preferred stack. Confirm this choice before Stage 1 implementation; the current specification's npm commands and TypeScript contracts describe that proposal. See [the language decision proposal](docs/adr/0001-console-app-language.md). Tool-neutral teaching means independence from the editor and coding assistant; the first lab will have one implementation language.

Keep content and roadmap topology as versioned typed data. Separate the platform from runnable labs:
- `apps/web/` — interactive roadmap website
- `content/` — modules, node metadata and MDX lessons
- `labs/` — independently runnable TypeScript examples
- `packages/shared/` — shared types and validation only when justified
- `docs/` — architecture, ADRs, benchmark methodology, security and author notes
- `docs/specs/` — detailed implementation specifications derived from this project plan; see the [specification index](docs/specs/README.md)

Keep a reader-facing `DEVLOG.md` at the repository root. Link it from the public README when the README is created; a separate blog platform is unnecessary for v1.

Use localStorage for anonymous progress in MVP, with import/export JSON if easy. No user accounts or backend database in v1. Ensure the site can build and render without any AI API key; labs may optionally support real model providers, but **mock mode must be runnable offline**. No secrets in the repo.

Avoid premature abstractions or building an agent framework just for the course. Prefer minimal examples that expose mechanisms clearly.

## 6. Design requirements
- Clear visual learning graph with 7 stage groups and connected topic nodes
- Clickable nodes with content and lab links
- Completed / active / locked-by-prerequisite visual distinctions (locking is advisory, not restrictive)
- Responsive mobile fallback to an accessible vertical step list
- Search or topic filter only after the core map works
- Progress persists locally
- Keyboard accessibility, semantic elements and focus indicators
- No copyrighted roadmap.sh artwork, copied text, or cloned branding

## 7. Portfolio evidence and quality bar
Each lab must include learner starter files, a separate reference solution, step-by-step instructions, runnable scripts, deterministic acceptance checks, expected outputs, and troubleshooting guidance. Keep learner-authored acceptance checks as part of the exercises where specified. Before marking a lab verified, the creator must complete it from a fresh learner starting point and record the date, environment, commands, actual results, and any instruction fixes. Until that walkthrough passes, label the lab unverified.

For new or changed behavior, require plan-first and test-first work with unhappy paths before happy paths. Capture actual failing and passing results during the walkthrough; never infer test-first development from a finished passing suite. Documentation-only tasks use relevant document/link checks instead of artificial unit tests.

Each learning stage ends with a verified local Git commit containing the learner's completed work and relevant evidence. Include this checkpoint in every stage's completion instructions. Record the commit hash in the creator walkthrough or learner completion notes. A commit alone does not establish that the stage passed its checks.

At least one experiment must record:
- Task completion and automated test pass rate
- Wall-clock latency
- Model/tool calls and token usage when available
- Estimated cost with explicit assumptions
- Failure categories and human intervention

Benchmark comparisons must use identical tasks and acceptance criteria; report model/configuration and number of runs. Do not claim multi-agent is superior without evidence. Separate illustrative screenshots from real measurements.

Platform quality gates: typecheck, lint, unit tests, production build, and a basic end-to-end smoke test. CI must not require paid API access.

## 8. Delivery phases
**Phase 0 — First exercise:** finalize the first task brief, learner starter files, specification template, role configuration, acceptance checks, and reference solution. Complete and record a learner walkthrough before building the website shell.
**Phase 1 — Vertical slice:** Next.js shell + interactive map + the verified first exercise + progress persistence + CI. Repeat the walkthrough through the website and prepare the repository for public release.
**Phase 2 — Core learning path:** create and personally complete stages 1–3, one exercise at a time; repair instructions using actual run results.
**Phase 3 — Advanced engineering:** create and personally complete stages 4–6, including role handoffs, evaluation reports, and adversarial exercises.
**Phase 4 — Capstone and course release:** complete stage 7 and run the full course in order from clean learner starting points. Fix missing prerequisites and setup gaps, then publish demos, the public README, screenshots, and portfolio evidence.

Do not start Phase 2 until Phase 1 is usable end-to-end. Prioritize finished slices over many empty lessons.

Write a short devlog entry after each meaningful milestone, completed learner walkthrough, or experiment that changes the approach. Start during planning and include the accumulated entries when the repository becomes public.

## 9. Definition of done for MVP
- Public-ready homepage with a clear promise and audience
- Interactive seven-stage roadmap, at least one complete clickable lesson
- One runnable TypeScript agent lab with mock provider and tests
- First lab includes a learner-written specification, role configuration, enforced tool/step limits, and a reproducible failure-and-fix exercise
- First lab requires planning completion before coding and actual failing/passing test evidence, with unhappy paths written first
- First lab teaches repository instructions with a session-verification checklist; tool-specific verification status is recorded separately from offline mock checks
- Recorded successful creator walkthrough from the learner starter files through the website
- Local progress tracking
- Responsive and keyboard-accessible UI
- Passing CI for lint, typecheck, tests and build
- README with screenshots, quickstart, architecture overview and honest status
- Devlog linked from the README, covering the first exercise and its actual walkthrough results

The platform MVP is the first verified course slice, not a completed seven-stage course. Mark the full course complete only after every exercise and the capstone have passed the creator's walkthrough in sequence.

## 10. Success metrics
Primary: the creator can complete the course from the published learner instructions and starter files, produce the required artifacts, pass the checks, and reproduce the documented failure/recovery exercises without undocumented setup steps.
Secondary: a hiring manager can clone the repo, run the platform and first lab, inspect tests and understand the engineering decisions in under 15 minutes; real learner feedback and GitHub engagement.

## 11. Working rules for coding agents
- Read this plan and existing code before proposing changes.
- Before implementing a bounded task, write or update its detailed specification in `docs/specs/`, link it to the relevant section or phase of `PLAN.md`, and define acceptance checks. Implement one specification in small reviewable steps and record actual verification evidence.
- Finish the task's planning before writing tests or implementation code. Resolve blocking questions, define implementation steps and expected failure behavior, and revise the plan/specification before proceeding when requirements change.
- For behavior changes, write tests first, starting with unhappy paths. Run them and confirm the expected behavioral failures before implementing; add happy-path tests before their implementation. Make them pass with the smallest change, then refactor and rerun relevant checks. Record actual failing/passing evidence. Use appropriate checks for documentation-only changes.
- Use a separate branch for each task specification and integrate completed work following section 18. Follow applicable company and repository policies for AI tools, data handling, review, verification, and merging.
- For this repository, commit and merge each completed implementation into local `main` once its required engineering checks/reviews pass, then verify the integrated result. This standing local workflow does not require the whole course to be release-ready; report pending learner walkthroughs honestly. Remote pushes and deployment remain separate actions.
- After completing and verifying each authoring stage or delivery milestone, commit its scoped changes locally before reporting it complete, and report the commit hash. Use document/link checks for documentation milestones. Do not describe unfinished or failing work as a completed-stage checkpoint.
- Ask before changing scope, stack, architecture, or adding paid dependencies.
- Keep examples executable without API credentials via deterministic mock adapters.
- Build and verify each exercise before polishing its presentation. Do not replace hands-on tasks with topic summaries or mark a lab verified without an actual learner walkthrough.
- Run tests and report actual outcomes; never fabricate benchmarks or screenshots.
- Document key trade-offs in ADRs, not long speculative essays.
- Update `DEVLOG.md` after meaningful progress. Describe what changed, the evidence, problems encountered, and the next step; distinguish planned work from implemented and verified work. Never invent a learner run, result, screenshot, or personal experience.
- Avoid unnecessary agent parallelism: use multiple agents only for independently scoped tasks when the benefit outweighs cost and coordination.

## 12. Next artifacts (create after approval of this plan)
1. `TASKS.md`: first-exercise tasks followed by platform milestones, with dependencies and links to detailed task specifications in `docs/specs/`.
2. GitHub repository: suggested name `from-developer-to-agentic-developer`, using the MIT license in `LICENSE`, scaffold, issue labels and first milestone.
3. First exercise package and recorded creator walkthrough, followed by the website vertical slice.

## 13. Decisions to confirm
- Console-app implementation language: proposed TypeScript on Node.js; see [the rationale and alternatives](docs/adr/0001-console-app-language.md).
- Public repository name (default: `from-developer-to-agentic-developer`).
- Whether to use the existing Agentic Factory as an external capstone case study (recommended) or integrate it later.
- Whether content should be English only for v1 (recommended).

## 14. Public devlog
Purpose: let readers follow the creation of the course and the creator's experience completing its exercises.

Use short dated entries in `DEVLOG.md`, newest first. Each entry should cover:
- The task or question being worked on
- What was created or changed, with links to relevant files or evidence
- What was actually run and observed, including failures and limitations
- The decision or lesson supported by those observations
- The next concrete step

Keep entries readable without the chat history. Link to ADRs for detailed architecture decisions and run records for measurements. Planning entries must say when nothing has been implemented or run yet. Publish only material suitable for the public repository; remove secrets and private data from any included traces or screenshots.

## 15. License
Use the MIT license in `LICENSE` for original project code and course materials unless a file states otherwise. Third-party dependencies and referenced materials retain their own licenses. Keep the README's license statement consistent with this scope.

## 16. Project plan and detailed specifications
`PLAN.md` describes the whole project: purpose, scope, curriculum, architecture, delivery phases, and quality requirements. Keep detailed requirements for a bounded implementation task in `docs/specs/NNN-short-task-name.md`, derived from and linked back to this plan. Use `docs/specs/README.md` as the index.

Each task specification should state the goal, relevant plan section, scope and exclusions, inputs/outputs, implementation constraints, acceptance criteria, verification commands or steps, and actual completion evidence. Include permissions and failure behavior where the task involves an agent or tool. Mark planned checks separately from recorded results.

`TASKS.md`, when created, will track order, dependencies, and status with links to the specifications. ADRs capture lasting architectural decisions; `DEVLOG.md` tells readers what happened and links to the supporting work.

Use the same plan-to-spec workflow in learner projects. Their `PLAN.md` and `docs/specs/` live within the learner project root, separately from the specifications used to build this course and website. A task specification must stay within the project plan; scope or architecture changes require an explicit update to the plan.

## 17. Repository instructions for coding agents
Teach repository instruction files through the Stage 1 exercise. Their purpose is to give a coding assistant durable project guidance across tasks: where to find requirements, how to work in the repository, and how to check results.

Keep the working rules tool-neutral in the shared repository instructions. Tool-specific files should load or point to those rules using a mechanism supported by that tool; verify that the content is actually loaded. This repository keeps the shared guidance in `AGENTS.md`, with a thin `CLAUDE.md` import adapter. The course's workflow and offline checks must remain usable without either product.

Codex discovers `AGENTS.md` by default; `CODEX.md` is not a default instruction filename. Alternate names require configured fallback discovery. See the [official OpenAI documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Claude Code supports `CLAUDE.md`. Current versions also support `AGENTS.md` under documented loading conditions; verify the installed version and active files. Where needed, a small `CLAUDE.md` containing an `@AGENTS.md` import can reuse shared guidance. See the [official Claude Code documentation](https://code.claude.com/docs/en/memory). Keep detailed tool setup in the exercise so it can be checked against current documentation.

Have the learner include:
- A short project description and links to `PLAN.md`, `docs/specs/`, and relevant architecture decisions
- Finish planning and the relevant task specification before coding; resolve blocking questions and define acceptance checks first
- Write tests before behavior, unhappy paths first; observe the expected failures, implement, then observe passing checks
- Finish each stage with its required checks, a scoped local Git commit, and the resulting commit hash in the completion record
- Repository layout and where changes belong
- Real setup, run, and verification commands, with prerequisites
- Concrete coding and testing conventions that matter to this project
- Review expectations: inspect the diff, compare it with the task spec, and report findings with evidence
- Applicable company/repository policy references, including approved AI tools, data handling, branch workflow, required reviews, and merge checks
- Action boundaries and when to stop or ask a person
- Completion reporting: changed files, checks actually run, results, and unresolved limitations

Keep the file concise and maintain it when commands or conventions change. Leave task-specific requirements in their specifications and historical progress in the devlog. Exclude secrets, copied chat history, and commands for tooling that does not exist yet.

Example shared rule to adapt to any supported coding assistant:

> Finish the task plan and specification before writing code. Define scope, constraints, acceptance criteria, failure behavior, and verification steps, and resolve blocking questions. Then write and run unhappy-path tests before implementing behavior; confirm the expected failures. Add happy-path tests before implementing successful behavior. Make the tests pass, refactor, and rerun the required checks. Report the commands and actual results. Follow applicable company and repository policy.

Distinguish repository guidance from per-role configuration and runtime enforcement. Writing an instruction file does not create planner/reviewer agents or enforce filesystem, network, or tool restrictions. The custom TypeScript labs must explicitly load any instruction content they use; they do not inherit Codex or Claude Code's discovery behavior automatically.

## 18. One specification per branch and verified integration
Use a separate branch for each bounded task specification when building this project. Teach this workflow to learners in Stage 4, when the small software factory is introduced. The course example is `spec/004-factory-review` for `docs/specs/004-factory-review.md`, relative to the learner project. Stages 1–3 do not require a branch-to-merge exercise.

1. Identify the applicable company and repository policies, the integration branch, and required reviews/checks before starting work.
2. Create the specification branch from the current integrated base. Include the specification, implementation, tests, and relevant documentation in that branch's commits; keep unrelated work separate.
3. Inspect the diff against the specification and run its acceptance checks plus required repository checks. Record actual results and review findings.
4. Merge through the required review process once its checks and required approvals are satisfied, using the prescribed merge strategy. For this repository, the local target is `main` after completed implementation and passing engineering checks. For unfinished learner/factory work, use a disposable lab integration branch; production `main` has the additional readiness requirements below. Use a pull/merge request where policy requires one.
5. Verify the integrated result, update task status/evidence, and start the next specification from the updated integration branch. Independent specifications may use separate concurrent branches; integrate dependent specifications in order. Record any intentionally stacked branch and its dependency.

Stage 4 practices the complete branch-to-merge cycle, integrating multiple specifications, resolving a conflict, and checking the combined behavior. Passing checks on separate branches does not establish that their merged result passes.

### When to merge into main

**This project's development:** after each specification is implemented and its required engineering checks/reviews pass, create the scoped local commit and merge its development branch into local `main`. This is the standing integration workflow; the whole course need not be finished or production-ready. Verify the integrated result and report the relevant hashes. A pending creator walkthrough remains visible as unverified course evidence and must be completed before claiming that lesson/stage is verified. Failed engineering checks block integration. Establish a tracked base before the first integration and preserve unrelated work.

**The learning path:** teach `main` as the production-ready target in the course's release example. A local stage commit or successful merge into a lab integration branch is a learning checkpoint. Merge into production `main` only when the intended change meets acceptance criteria, required automated and integration checks pass, required reviews/approvals are complete, and applicable security, configuration, compatibility, and release/recovery requirements are satisfied. Resolve release-blocking defects first. Passing mock exercises or receiving an agent's positive review does not certify production readiness.

Use a disposable branch such as `integration/stage-4` for the factory integration exercise; it demonstrates integration without promoting unfinished work to a production target. Follow the employer's actual branch/release model when it differs from this example, including any automatic deployment triggered by `main`. The course does not require a production deployment.

### Commit checkpoints for authors and learners

- **Building this project:** commit and integrate implemented specifications into local `main` as described above. Before reporting a fully verified authoring stage or delivery milestone complete, also ensure its required course/walkthrough evidence is present and committed. Smaller commits during the work are encouraged; distinguish implementation integration from verified course completion.
- **Following the course:** after each completed learning stage, including Stage 1, inspect the diff, run the required checks, and create a local commit of the learner-authored artifacts. Report or retain its hash as the stage's reproducible checkpoint. Supply basic local Git setup instructions for a fresh learner copy when needed. Branching, merging, and conflict exercises remain in Stage 4.
- Inspect staged changes and include only the intended work; exclude dependencies, build output, secrets, and unrelated changes. Intentionally retained fixture/test evidence may be included.
- A failing or incomplete stage must stay labeled incomplete even if a work-in-progress commit is made. Do not weaken checks to obtain a completed checkpoint.
- Follow company/repository policy for commit messages, history, review, and integration. A checkpoint alone does not grant merge permission; this project's standing local integration workflow is defined above. It does not authorize remote pushes, remote merges, or deployment.

**Company policy takes precedence over course conventions.** Developers must follow their employer's rules for approved AI tools, sharing code or data, branch names, protected branches, required human/code-owner review, CI checks, and merge/release permissions. Adapt the exercise to those rules; never bypass a required control to follow a course example. For a personal project, document the chosen repository rules. An agent review does not replace a human approval required by policy.

## 19. Later goal — optional VS Code extension
After the core course and standalone console labs are usable and verified, consider a course-specific VS Code extension to open exercises, launch their documented commands, and inspect results inside the editor. This is a deferred goal, outside v1 and the Stage 1 implementation specification. Define its scope and acceptance criteria in a separate future specification before building it.

The extension must remain optional: lessons, lab commands, checks, and evidence must continue to work from a terminal with any editor and the learner's approved coding assistant. Reuse the standalone lab behavior rather than maintaining an editor-specific agent implementation. No extension scaffolding or packaging is required now.
