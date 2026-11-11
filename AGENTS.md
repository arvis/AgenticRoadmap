# Repository working instructions

This repository contains the plan and documentation for a hands-on course in agentic development. Application and lab code have not been scaffolded yet.

## Read before work

- Read [PLAN.md](PLAN.md) for project scope, curriculum, architecture, and delivery rules.
- Use [docs/specs/](docs/specs/README.md) for detailed task specifications. Keep implementation tasks within the project plan.
- Use [DEVLOG.md](DEVLOG.md) for development history and actual evidence.
- Inspect existing files and preserve unrelated work.

## Plan before coding

- Finish the project planning relevant to the current task and its detailed specification before writing tests or implementation code.
- Define scope, inputs/outputs, constraints, expected failure behavior, acceptance criteria, implementation steps, and verification. Resolve blocking questions before coding.
- If requirements change, revise affected planning and the specification before continuing implementation.
- Keep detailed planning bounded to the current task; future tasks can be refined when reached.
- Ask before changing project scope, stack, architecture, or adding paid dependencies.

## Tests before behavior

- For new or changed behavior, write tests before implementation. Start with unhappy paths: invalid input, denied operations, boundary cases, and failures.
- Run the tests and confirm they fail for the expected behavioral reasons. Fix setup/import/harness problems before treating a failure as evidence.
- Add happy-path tests before implementing the corresponding successful behavior.
- Implement the smallest change that passes, then refactor and rerun the relevant checks.
- Record actual failing and passing results. A passing finished suite alone does not demonstrate test-first development.
- For documentation-only work, check affected content and links instead of adding artificial unit tests.

## Review and integration

- Use a dedicated branch per implementation specification and follow [the integration workflow](PLAN.md#18-one-specification-per-branch-and-verified-integration).
- Inspect the diff against the specification, complete required checks/reviews, and verify the integrated result.
- Before reporting a completed authoring stage or delivery milestone, create a local Git commit of its verified changes, including specifications, implementation/tests where applicable, documentation, and evidence. Inspect staged scope first, preserve unrelated work, and report the resulting commit hash. Follow the checkpoint rules in section 18 of the plan; incomplete work must remain explicitly labeled.
- Follow applicable company and repository policy for AI tools, data handling, reviewers, protected branches, and merging. Agent review cannot replace a required human approval.
- Keep examples runnable offline without API credentials. Enforce runtime boundaries in code and permissions as specified; written instructions alone do not enforce them.

## Evidence and completion

- Report changed files, commands actually run, observed results, and remaining limitations. Never fabricate tests, benchmarks, or learner walkthroughs.
- Update the devlog after meaningful progress. Keep architectural decisions in ADRs when needed.
- No application setup or test commands exist yet. Add real commands when the relevant scaffold is implemented and verified.
- Use one agent by default; delegate only when explicitly authorized by the user or applicable instructions.
