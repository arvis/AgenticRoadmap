# Task specifications

The root [PLAN.md](../../PLAN.md) describes the overall course and platform. This directory holds detailed specifications for bounded tasks that implement that plan.

Name each specification `NNN-short-task-name.md`, for example `001-stage-1.md`. Link it to the relevant plan section or delivery phase.

Each specification should contain:

- **Goal and plan reference:** what the task delivers and which part of the project plan it implements.
- **Scope and exclusions:** exactly what belongs in the task.
- **Inputs and outputs:** expected files, data, or observable behavior.
- **Constraints:** technical requirements and, where relevant, tool permissions and failure behavior.
- **Branch and integration:** the dedicated specification branch, intended base/target, dependencies, and applicable review/check/merge policy.
- **Acceptance criteria:** observable conditions for completing the task.
- **Implementation plan and readiness:** ordered steps, settled failure behavior, and resolution of blocking questions before coding begins.
- **Verification:** commands or manual steps to check those conditions.
- **Status and evidence:** actual results and remaining limitations, clearly separated from checks that are only planned.

Finish planning the bounded task and its specification before writing tests or implementation code. For behavior changes, write unhappy-path tests first and run them to confirm failures for the intended behavioral reasons. Write happy-path tests before implementing successful behavior, make the tests pass, then refactor and rerun relevant checks. Record actual failing/passing results; use document/link checks for documentation-only tasks. Update this index as specifications are added. `TASKS.md`, when created, will track scheduling and dependencies with links here.

Implement each specification on its own branch, keeping the spec, implementation, tests, and documentation together. For this repository, commit and merge into local `main` after the scoped implementation and required engineering checks/reviews pass, then check the integrated result. Keep pending learner walkthroughs explicitly unverified; full course completion is a separate evidence requirement. Follow company and repository policy for naming, required approvals, CI, and merge strategy; the course example uses `spec/NNN-short-task-name`. See [the integration workflow](../../PLAN.md#18-one-specification-per-branch-and-verified-integration).

Include the completion checkpoint in each stage specification: required checks pass, the completed scoped work is committed locally, and the commit hash is reported or retained as evidence. Apply this both to course authoring and to the learner's stage outputs. A work-in-progress commit must not be presented as verified completion.

Course exercises introduce the branch-to-merge convention in Stage 4 with the small software factory; earlier stages do not require that exercise. Specifications authored by a learner belong under `docs/specs/` in that learner project's root; this directory describes work on the course and platform itself.

For learners, stage commits preserve progress and the factory exercise merges into a disposable lab integration branch. Remind learners to merge into production `main` only when the change is production-ready under company policy, including its required checks and approvals. See [when to merge into main](../../PLAN.md#when-to-merge-into-main).

## Specification index

| Specification | Scope | Status |
| --- | --- | --- |
| [001 — Stage 1](001-stage-1.md) | Five hands-on lessons, standalone starter/solution, bounded mock agent, test-first evidence, and creator walkthrough | Specified; console language decision pending; implementation and walkthrough not started |
