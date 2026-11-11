# Stage 1 — implementation evidence and creator walkthrough

Date: 2026-11-11. **Implementation checked; creator walkthrough pending.**

## Automated author verification

Author checks ran on Windows 11, Node 24.11.0, npm 11.6.1. Each package passed a separate clean locked `npm ci --ignore-scripts --no-audit --no-fund` installation. Dependencies are pinned in each lockfile: TypeScript 7.0.2, Zod 4.6.7, Vitest 5.1.0, and Node types 24.19.2. Other OS/runtime combinations are unverified.

Actual retained records are in [the evidence directory](../evidence/stage-1/README.md). They demonstrate:

- A working harness followed by 30 unhappy-path assertion failures against the unfinished agent, then 37 failures after adding further boundary and happy-path cases, before implementing the loop.
- 37 passing agent tests after implementation; 10 subsequent CLI/scenario failures against their stubs, followed by 47 passing tests after that behavior was implemented.
- A deliberately introduced `<=` loop-boundary defect: three existing limit tests failed and the looping run made four calls instead of three. Restoring `<` returned the unchanged tests to green.
- A further explicit-null limit regression written and observed failing before its fix. The final suite has **50 passing tests**.
- **16 independent acceptance checks** pass on the solution. The untouched starter builds/typechecks and is correctly rejected as incomplete.
- Setup, typecheck, build, tests, demos, and acceptance ran with a Node preload disabling standard network APIs. TCP/fetch canaries confirmed blocking before connection. This is not OS disconnection or a security sandbox; native addons and arbitrary subprocess binaries are not covered. See [the machine-readable record](../evidence/stage-1/verification.json).

The preliminary attempt to typecheck before installation finished failed because `tsc`/`vitest` were unavailable. That setup failure is **not** counted as test-first evidence. The retained red behavior runs occurred after dependencies were available and typechecking passed.

## Acceptance status

| Criteria | Current evidence/status |
| --- | --- |
| S1-01 | Supplied readiness/spec templates and reference author plan exist; learner completion pending |
| S1-02 | Shared rules and adapter provided; fresh assistant-loading experiment not run |
| S1-03 | Five actionable lesson files written; creator usability walkthrough pending |
| S1-04 | Starter clean install/setup/typecheck/build pass; acceptance rejects NOT_IMPLEMENTED |
| S1-05 | Author original red/green evidence retained; creator's learner-authored sequence pending |
| S1-06–S1-08 | Runtime validation, permission/count boundaries, deterministic demos and exit codes checked |
| S1-09 | Acceptance passes solution/rejects starter; creator's completed learner copy pending |
| S1-10 | Author controlled mutation/recovery demonstrated; creator exercise pending |
| S1-11 | Standard Node network APIs blocked for actual checks; limits stated above; creator run pending |
| S1-12 | Creator walkthrough not started |
| S1-13 | Author implementation commit/local-main integration reported in completion message/history; learner checkpoint pending |

## Creator checklist — complete personally

- [ ] Copy starter to a fresh learner project, excluding installed/generated directories.
- [ ] Follow all five lessons in order without taking the solution as learner work.
- [ ] Finish the learner plan/spec and readiness record before writing code.
- [ ] Complete instruction rules; record actual loading evidence or leave the optional check unverified.
- [ ] Write unhappy-path and happy-path tests first; retain original red/green results.
- [ ] Complete the role/runtime, inspect all scenario traces, and pass independent acceptance.
- [ ] Reproduce and repair the boundary defect without weakening tests.
- [ ] Record actual offline-check method/results/limits.
- [ ] Inspect and commit the learner work locally; record its hash here.
- [ ] Record unclear instructions, environment gaps, and actual elapsed time; revise the course accordingly.

Learner project/snapshot: **pending**. Learner commit hash: **pending**. Actual learner duration: **unmeasured**. Optional assistant-loading status: **unverified**.

Only mark the course stage verified after the required creator evidence exists. Mock fixtures do not measure real-model quality or certify production readiness. No website, provider calls, remote push, or deployment is part of this implementation.
