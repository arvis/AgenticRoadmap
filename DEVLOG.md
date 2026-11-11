# Development log

Follow the creation of **From Developer to Agentic Developer**, a hands-on course for experienced software developers learning to build agentic systems. The course creator will also complete the exercises from the learner's starting files and record the results here.

Entries cover decisions, working software, failures, and verified progress. Newest entries appear first.

## 2026-11-11 — Implementing the Stage 1 console lab

Implemented [the first lab](labs/01-first-agent/README.md): five practical lessons, a task/clarification worksheet, planning and instruction templates, an intentionally unfinished starter, and an independent reference solution. The console agent uses TypeScript/Node.js, a scripted model, one read-only issue tool, strict validation, explicit role permissions, exact step limits, and structured traces. The website and optional VS Code extension remain out of scope.

Author verification used Windows, Node 24.11.0, and npm 11.6.1. Both packages passed separate clean locked installations. Actual behavioral red runs preceded the agent and parsing/scenario implementation; subsequent checks passed. A controlled off-by-one mutation failed three existing limit tests and made four calls instead of three; restoring the boundary repaired them. A later explicit-null limit regression was observed failing and fixed. The final suite has **50 passing tests**, and the reference solution passes **16 independent acceptance checks**. The untouched starter builds but is correctly rejected as incomplete.

Actual checks also ran with standard Node network APIs disabled by a preload guard; TCP/fetch canaries confirmed the block before connection. This is a process-level verification method with documented limits, not an OS sandbox. No live provider was used. See [retained evidence](docs/evidence/stage-1/README.md) and [criterion-level walkthrough status](docs/walkthroughs/stage-1.md). The records distinguish captured test-first work from plumbing checked after implementation.

**Still pending:** the creator personally completing the lessons from a fresh starter, learner-authored red/green records and commit, optional assistant instruction-loading verification, and actual learner-duration measurements. The implementation is checked; the course stage remains unverified until that walkthrough is complete.

**Integration:** the scoped implementation is to be committed and merged into local `main` after checks, with its hash reported in the completion message. No remote push or deployment is part of this work.

**Next:** take Stage 1 from [lesson 1](content/stage-1/01-plan-before-code.mdx), record the creator walkthrough, and fix instructions based on that experience before building the website.

## 2026-11-11 — Distinguishing development integration from production main

Clarified [when to merge into main](PLAN.md#when-to-merge-into-main). For this repository, completed implementations are committed and merged into local `main` after required engineering checks/reviews pass, then the integrated result is verified. The whole course need not be finished first. Pending creator walkthroughs remain explicitly unverified and still block claims of verified course completion.

The learning path teaches a production-readiness rule: a stage commit preserves progress, while production `main` receives changes only after the company's acceptance, verification, review, and release requirements are met. Stage 4's factory exercise uses a disposable lab integration branch. Passing mock tests or obtaining an agent review does not certify production readiness.

**Verification:** checked updated documentation links and consistency across the plan, instructions, README, and Stage 1 spec. No commit, merge, push, deployment, or runtime test was performed during this policy update.

**Next:** settle the console language and implement Stage 1, keeping implementation integration and learner walkthrough status separate.

## 2026-11-11 — Requiring a commit after each completed stage

Made the commit checkpoints explicit in the [plan](PLAN.md#commit-checkpoints-for-authors-and-learners), shared working instructions, README, and specification guide. Both course authoring stages/delivery milestones and learner stages must finish with their required checks and a scoped local Git commit. The resulting hash identifies the verified checkpoint; a work-in-progress commit does not establish completion.

Updated [Stage 1's specification](docs/specs/001-stage-1.md) with learner/author checkpoint evidence and a new acceptance criterion. A basic local commit belongs in Stage 1, while branching/merging remains a Stage 4 exercise. Company/repository policy continues to govern history, review, and integration.

**Verification:** checked documentation links and the revised completion requirements. No commit was created by this policy update; the current Stage 1 package is unimplemented, and the console-language decision remains open.

**Next:** settle the console language and implement Stage 1, preserving actual verification evidence before its completion checkpoint.

## 2026-11-11 — Deferring an editor extension and reviewing the console language

Recorded an optional course-specific VS Code extension as a [later goal](PLAN.md#19-later-goal--optional-vs-code-extension), after the core course and standalone labs are usable and verified. It is outside v1 and the Stage 1 specification; terminal use and editor independence remain requirements.

Added a [language decision proposal](docs/adr/0001-console-app-language.md) recommending TypeScript on Node.js, consistent with the existing preferred stack. It compares that project fit with Java and Python and leaves the choice explicitly pending before implementation. Updated the plan, spec, index, and README to reflect this status.

**Verification:** checked local documentation links and consulted the official Node.js TypeScript introduction and VS Code extension tutorial. No console application or extension was scaffolded, and no runtime tests or learner walkthrough were run.

**Next:** settle the console-app language, then implement Stage 1 from the updated specification.

## 2026-11-11 — Specifying the first complete stage

Wrote [the Stage 1 specification](docs/specs/001-stage-1.md). It defines five practical lessons and a standalone issue-lookup agent lab with learner planning/instruction templates, an unfinished starter, a separate reference solution, and independent acceptance checks.

The spec makes planning readiness, unhappy-path-first tests, actual failing/passing evidence, exact tool/step boundaries, and the creator's fresh-start walkthrough checkable. It includes a controlled off-by-one defect to reproduce and repair. The core lab uses deterministic mocks and can be completed manually; assistant instruction-loading is a separately labeled optional check. Factory and learner branching exercises remain in Stage 4.

**Verification:** checked specification links and consistency with the project plan. Created local branch `spec/001-stage-1`; the repository has no commits yet, and existing untracked planning files were preserved. No implementation, runtime tests, offline run, or learner walkthrough has been performed. All exercise acceptance criteria remain pending.

**Next:** implement the scoped Stage 1 package from this specification, beginning with the brief, contracts, harness, and failing behavior tests. Establish a tracked repository baseline before integration; website work remains a later task.

## 2026-11-11 — Planning first and testing unhappy paths before implementation

Updated Stage 1 to require completed task planning before coding: scope, constraints, failure behavior, acceptance criteria, implementation steps, and blocking questions must be settled first. The learner then writes and runs unhappy-path tests before implementing behavior, adds happy-path tests before the corresponding implementation, and records actual failing/passing results.

Added tool-neutral [repository working instructions](AGENTS.md) containing this workflow and a thin [Claude Code adapter](CLAUDE.md) importing the same file. The course teaches common working rules, with optional tool-specific setup and loading checks. Learners can use an approved assistant or perform the coding steps manually. Updated the README and specification guide consistently.

**Verification:** checked local documentation links, the shared instruction content, and the adapter's import target. No fresh coding-tool loading experiment, software implementation, test-first demonstration, or learner walkthrough was run. This documents the required workflow; it does not claim earlier work followed it.

**Next:** write the first exercise specification with explicit planning readiness and unhappy-path failing/passing evidence requirements.

## 2026-11-11 — Moving branch integration to the factory stage

Moved the learner's branch-per-spec and merge exercise from Stage 1 to Stage 4, where planner, implementer, and reviewer roles form a small software factory workflow. That stage will cover the full branch-to-merge cycle, integrating separate specifications, resolving a conflict, and checking the combined result.

The earlier stages can focus on their agent exercises without a branch-to-merge requirement. The branch-per-spec development convention for building this repository remains in place, and company/repository policies still take precedence throughout the course. This revises the teaching sequence described in the previous entry.

**Verification:** checked updated documentation links and confirmed that Stage 1 no longer contains the Git workflow exercise. No branches were created or merged, and no learner walkthrough was run.

**Next:** keep branch integration out of the first exercise specification and include it in the Stage 4 factory exercise.

## 2026-11-11 — Giving each specification its own branch

Added a [branch and integration workflow](PLAN.md#18-one-specification-per-branch-and-verified-integration) to the plan: each task specification gets a dedicated branch containing its implementation, tests, and documentation. Completed work is reviewed, checked, and merged into the integration branch, then the integrated result is checked again.

Stage 1 will practice a complete branch-to-merge cycle. Stage 4 will add integration of separate specifications and a controlled merge-conflict exercise. Updated the README and specification guide to describe the same workflow.

Company and repository policies take precedence over course examples, including approved AI use, data handling, required reviewers, protected branches, CI, and merge strategy. Agent reviews cannot substitute for human approvals required by policy.

**Verification:** checked documentation links and consistency. No Git branches were created or merged, and no software checks or learner walkthrough were run for this documentation change.

**Next:** include the branch-to-merge cycle and its required evidence in the first exercise specification.

## 2026-11-11 — Adding repository instructions to the first exercise

Expanded Stage 1 in the [plan](PLAN.md) to include writing repository instructions and checking their loading in the learner's selected coding tool. The exercise will cover project context, links to requirements, real commands, coding conventions, review expectations, and action boundaries.

Checked the [OpenAI instructions guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md) and [Claude Code instructions guide](https://code.claude.com/docs/en/memory): Codex uses `AGENTS.md` by default; Claude Code supports `CLAUDE.md` and, in current versions under documented conditions, `AGENTS.md`. The exercise will teach learners to verify the installed tool's behavior and keep shared guidance consistent.

**Verification:** checked the documentation references and local links. No coding-tool instruction-loading experiment or learner walkthrough has been run. The plan separates that future session check from offline mock tests and distinguishes written guidance from enforced permissions.

**Next:** include the repository-instruction exercise in the first detailed task specification.

## 2026-11-11 — Making the plan-to-spec workflow explicit

Clarified the documentation structure: [PLAN.md](PLAN.md) provides overall project direction, and detailed implementation specifications will live in `docs/specs/`. Added a [specification index](docs/specs/README.md) describing naming, required contents, and how acceptance checks and actual evidence will be recorded.

Updated Stage 1 and the README to teach the same workflow: start with the learner project's plan, derive a bounded task specification, and implement and verify that task. Learner specifications live within their own project root, separately from the specifications used to build this course.

**Verification:** checked documentation links and the updated references for consistency. This is a documentation change; no task implementation or learner walkthrough has been completed.

**Next:** write the first detailed task specification for the exercise package before implementing it.

## 2026-11-10 — Introducing the project and adding its license

Added a public-facing [README](README.md) explaining the audience, planned seven-stage curriculum, exercise format, and safety work. It links to this log and the detailed plan so readers can follow both the intent and the progress.

Added the [MIT license](LICENSE) for original project code and course materials. The license permits reuse, modification, and distribution, including commercial use, subject to retaining its copyright and permission notices. The text follows the [Open Source Initiative's MIT license](https://opensource.org/license/mit). Third-party materials retain their own licenses.

**Verification:** checked local documentation links and the license text against the official source. No application or lab exists yet, so no software tests or learner walkthrough were run. The README labels the curriculum and technology as planned and does not include installation commands for unimplemented code.

**Next:** prepare and complete the first exercise before building the website shell.

## 2026-11-10 — Defining a course we can actually complete

The first task is to make the learning path concrete enough to build and follow. The current [plan](PLAN.md) describes seven stages, from specifying a task and running a first agent through tools, state, orchestration, evaluations, safeguards, and a capstone.

During planning, we identified that specifications and agent roles needed explicit exercises. Safety was already mentioned, but it also needed actions learners could execute and check. The plan now requires learners to write a specification, configure responsibilities and permissions, run the workflow, and inspect actual results.

Every lesson will have starter files, instructions, acceptance checks, and a controlled failure to reproduce and fix. Safeguards will include exercises that attempt unauthorized tool access, follow injected instructions from untrusted content, exceed execution limits, and bypass approval boundaries. The checks must show whether the controls work.

The creator will be the first learner. An exercise will remain unverified until it has been completed from a fresh learner starting point and its actual results have been recorded. Mock mode will keep the exercises runnable without API credentials; any real-model measurements will be identified separately.

**Current status:** planning only. No website, lab implementation, learner walkthrough, or benchmark has been completed. This entry records the intended approach, not demonstrated results. The plan is to prepare the repository for public release once the first vertical slice works.

**Next:** prepare the first exercise: a task brief, learner starter files, a specification template, a role configuration, acceptance checks, and a separate reference solution. Complete that exercise before building the website shell.
