# Stage 1 ? Plan, test, and run an agent

**Implementation available; creator walkthrough pending.** This is a terminal lab, readable without the course website. You will build an issue-lookup agent, using a scripted model that requests a tool and consumes its result. No real inference, provider account, or coding assistant is required.

## Start here

1. Read [the task](TASK.md), then copy `starter/` to a separate learner directory. Copy source files only, excluding `node_modules`, `dist`, and generated `artifacts` if present. Keep this course repository available for the lessons and checks. Do not work inside `solution/`.
2. Follow the five lessons in order:
   - [Plan before code](../../content/stage-1/01-plan-before-code.mdx)
   - [Repository instructions](../../content/stage-1/02-repository-instructions.mdx)
   - [Unhappy-path tests first](../../content/stage-1/03-unhappy-path-tests-first.mdx)
   - [Run the agent](../../content/stage-1/04-run-the-agent.mdx)
   - [Inspect, break, repair, and commit](../../content/stage-1/05-inspect-break-and-repair.mdx)
3. Attempt each task before consulting [the reference solution](solution/README.md). A green reference suite does not verify your learner work.

You may use Codex, Claude Code, another company-approved assistant, or work manually. Record a nickname/learning goal privately if helpful; no personal information is required. Choose your tool in the optional session worksheet. The coding assistant helps you develop; the scripted agent is the program you build.

## Environment and setup

Author checks used Windows, Node **24.11.0**, npm **11.6.1**. Packages require Node 24.11 or later within 24.x and npm 11.x; other OS/runtime combinations have not been verified. Install Node/npm through your approved process. No globally installed TypeScript or Vitest is needed.

After completing planning, run these from your learner project:

```sh
npm ci
npm run check:setup
npm run typecheck
npm run build
npm run demo -- --scenario happy --issue ISSUE-001
```

The unchanged starter exits 1 with `FAILED / NOT_IMPLEMENTED`. That is intentional. Its test directory has no behavior tests: `npm test` reports no tests until you write them. Neither outcome establishes a working agent. Initial dependency acquisition can need network access. After installation, the local build, tests, scenarios, and checks need no internet/API credentials.

## Completion checks

From the completed learner project run `npm run typecheck`, `npm run build`, and `npm test`. Then from this lab directory run:

```sh
node checks/acceptance.mjs /absolute/path/to/your/learner-project
```

On Windows, quote paths with spaces. The checker runs the built CLI directly, exercises boundary behavior, compares repeated JSON, and checks saved artifacts. It returns nonzero on incomplete/incorrect behavior. It does not verify that you planned or wrote tests first; retain that evidence yourself.

Expected examples are in [expected/README.md](expected/README.md). Generated output goes in your project's `artifacts/`; it is not source. `denied`, `malformed`, and `looping` intentionally exit 1. Missing input asks a question and exits 0, but is not a completed task.

## Limits and troubleshooting

- `tsc`/`vitest` missing: run `npm ci` in that project; do not treat this as a test-first failure.
- `NOT_IMPLEMENTED`: implement `src/agent.ts` after capturing your failing behavior assertions.
- Old output after edits: rebuild before the demo/acceptance runner.
- `CLI_IO_FAILED`: check valid `role.json` and a writable, ordinary project-local `artifacts` directory. Symlink artifacts are rejected.
- Intentional failure code: inspect the JSON `error` and `trace`, not just the shell's exit status.

This lab has no sandbox for arbitrary code and no real-model security/quality claim. Follow company policy for tools, data, review, and release. Local stage commits preserve learning progress; they do not promote code to production `main`. Branch/merge exercises arrive in Stage 4. The optional future VS Code extension is not needed.
