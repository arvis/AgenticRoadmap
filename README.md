# From Developer to Agentic Developer

A hands-on course for experienced software developers learning to specify, build, test, and debug agentic systems.

Write a specification. Configure an agent's role and tools. Run the workflow. Trigger a failure. Implement a safeguard. Check the result.

This repository will contain the course materials, independently runnable TypeScript labs, and the source of an interactive learning website. The creator is also the first learner: each exercise must be completed from its learner starting files before it is marked verified.

## Current status

**Early development: planning and documentation.** The website and labs have not been implemented, and no course walkthrough or benchmark has been completed yet. There is no runnable application or installation command at this stage.

The next milestone is one complete exercise, verified from a fresh learner starting point. The website will follow that exercise. The seven-stage path below is the planned curriculum.

- [Development log](DEVLOG.md): decisions, progress, failures, and results as the project develops.
- [Project plan](PLAN.md): detailed curriculum, architecture, milestones, and completion criteria.
- [Task specifications](docs/specs/README.md): detailed implementation tasks derived from the project plan.

## Who this is for

Developers who already know how to program, use Git, work with APIs, and write tests. Experience with Java, another backend language, or TypeScript is a useful starting point; the labs will use TypeScript.

The course focuses on the engineering work around agents: clear tasks, tool contracts, context, state, permissions, evaluations, and human review. Each topic is introduced through something the learner builds and runs.

## What you will build

| Stage | Practical work | Evidence of completion |
| --- | --- | --- |
| 1. Specify and run | Finish the task plan/specification, write unhappy-path tests first, configure a role, and implement a minimal tool-using agent | Actual failing/passing tests, acceptance checks, a tool trace, and enforced execution limits |
| 2. Tools and MCP | Build and consume a read-only Model Context Protocol (MCP) server | Successful allowed requests and rejected invalid or unauthorized requests |
| 3. State and recovery | Build a resumable issue-triage workflow | Saved state, recovery after interruption, bounded retries, and no duplicate effects |
| 4. Roles and orchestration | Run the same repository task with one agent and with planner, implementer, and reviewer roles | Checked handoffs, enforced role permissions, a reviewed diff, and a comparison |
| 5. Evaluations and debugging | Build an evaluation runner, introduce a regression, and repair it | Repeatable cases, traces, JSON results, and a comparison report |
| 6. Safety and prompt injection | Attempt to bypass tool permissions, approvals, and execution limits using controlled fixtures | Adversarial tests, audit records, and documented remaining limitations |
| 7. Capstone | Complete a workflow from specification through human review | Reproducible demo, tests, run records, and an evaluation report |

## How the exercises will work

Each exercise will include a task brief, learner starter files, setup commands, numbered actions, acceptance checks, expected outputs, troubleshooting guidance, and a separate reference solution.

The first stage establishes the working order: finish planning and the task specification before coding, write unhappy-path tests first, observe the expected failures, then implement and verify the behavior. Happy-path tests also precede their implementation. Learners record actual failing and passing results.

Learners will write these rules into the repository instructions recognized by their chosen coding assistant. The course uses `AGENTS.md` as a shared example and shows tool-specific adapters such as `CLAUDE.md`. The workflow is tool-neutral: use a company-approved assistant or complete the coding steps manually. Tool-specific instruction loading is checked separately. These files guide the assistant; runtime permissions enforce action boundaries.

Stage 4 will introduce a small software factory workflow and the practice of implementing each task specification on its own Git branch, reviewing and checking the changes, then merging into a disposable lab integration branch. This includes combining changes and resolving conflicts. Learners will be reminded that production `main` receives only production-ready changes after the company's required checks and approvals. Earlier stages do not require a branch-to-merge exercise. Developers must follow applicable company and repository policies for AI use, data handling, reviews, and merging; course conventions are examples to adapt to those rules.

You will create an artifact, run it, inspect what happened, reproduce a controlled failure, and fix it. Short explanations and references will accompany the actions that need them. Completion will require observable results.

Every completed stage ends with its required checks and a local Git commit, giving the learner a reproducible checkpoint. This project's own development integrates each completed implementation into local `main` after its required engineering checks/reviews pass; pending creator walkthroughs remain visibly unverified. Learner checkpoints do not establish production readiness. Branch and merge exercises begin in Stage 4; remote publishing follows the applicable repository policy.

The creator's walkthroughs will identify missing setup steps and unclear instructions before an exercise is marked verified. The devlog will link to the resulting evidence as it becomes available.

## Safety is part of the work

Specifications, roles, safeguards, and human oversight will appear throughout the course. Role instructions will define responsibilities; runtime controls will enforce access boundaries.

Planned exercises include placing malicious instructions in tool output, requesting files outside an allowed directory, attempting unauthorized writes, denying an approval, changing an action after approval, and exhausting a step or retry limit. These exercises will use fixtures and disposable workspaces. Learners will inspect the trace and test whether the intended boundary held.

Passing the exercises will demonstrate the tested behavior under the documented conditions. Remaining limitations will be recorded alongside the results.

## Running locally

Setup instructions will be added with the first runnable exercise.

The planned website and automated checks will run without AI API credentials. Every lab will include deterministic offline mock mode; real model providers may be supported as an optional path. Mock results and actual model measurements will be labeled separately.

## Planned technology

- **Console labs (proposed):** TypeScript on Node.js, Zod, and Vitest; [language rationale](docs/adr/0001-console-app-language.md), pending confirmation before implementation.
- **Website:** Next.js App Router, React, Tailwind CSS, and MDX.
- **Verification:** unit tests, Playwright smoke tests, and GitHub Actions.
- **Progress:** anonymous local browser storage, with no accounts or database in v1.

The intended structure separates `apps/web/`, `content/`, `labs/`, and `docs/`. See the [plan](PLAN.md) for details.

Project-level direction lives in `PLAN.md`; detailed implementation specifications live in `docs/specs/`. Learner projects will use the same convention within their own project roots. The [specification index](docs/specs/README.md) is in place; application and lab scaffolding is still pending.

## Later goal

A course-specific VS Code extension may be added after the core course and console labs are usable and verified. It could open exercises, launch documented commands, and show results inside the editor. This is outside v1 and Stage 1; the course will remain usable from a terminal with any editor. See [the deferred goal](PLAN.md#19-later-goal--optional-vs-code-extension).

## Follow the build

Read the [devlog](DEVLOG.md) for dated updates on what changed, what was actually run, what failed, and what comes next. Entries distinguish planned work from implemented and verified work.

Feedback on the curriculum, task briefs, reproducibility, and safeguards is welcome. The immediate priority is a complete first exercise and the creator's walkthrough of it.

## License

The project's original code and course materials are available under the [MIT License](LICENSE), unless a file states otherwise. Third-party dependencies and referenced materials retain their own licenses.
