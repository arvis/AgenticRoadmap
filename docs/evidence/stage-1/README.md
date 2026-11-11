# Actual author verification records

These outputs were captured during implementation on 2026-11-11. They are automated author evidence, **not a creator learner walkthrough**. Logs are normalized to UTF-8, terminal color codes are removed, and local repository paths are replaced with `<repo>`. Reported test durations are tool output, not model-performance benchmarks.

| Record | Actual observation |
| --- | --- |
| [01 unhappy red](01-unhappy-red.txt) | 30 behavioral tests failed against NOT_IMPLEMENTED after the harness worked |
| [02 all red](02-all-red.txt) | 37 tests failed before agent implementation |
| [03 agent green](03-green.txt) | 37 passed after implementation |
| [04 CLI red](04-cli-red.txt) | 10 CLI/scenario tests failed; the existing 37 still passed |
| [05 CLI green](05-cli-green.txt) | 47 passed after CLI/scenario implementation |
| [06 controlled defect](06-mutation-red.txt) | Three limit tests failed after the deliberate off-by-one mutation; exit 1 |
| [07 mutated loop](07-mutation-loop.json) | Four model/handler calls instead of three; scenario exit 1 |
| [08 restored tests](08-repaired-green.txt) | Same 47 tests passed after restoring the boundary; exit 0 |
| [09 acceptance](09-acceptance.txt) | 16 independent checks passed |
| [10 null regression](10-null-limit-red.txt) | Explicit null incorrectly used the default limit; one failing assertion before fix |
| [11 final tests](11-final-green.txt) | 50 passing tests after explicit-null validation fix |
| [Guarded verification](verification.json) | Actual environment, source SHA-256, guard canary, command exits, scenario counts, and pending human checks |

The original red-run shell exit codes were not separately retained; their failing assertion/test summaries are retained. Later mutation and regression commands explicitly observed exit 1, and repaired runs exit 0. Do not substitute these author logs for your own test-first records.

Captured preimplementation red runs cover the runtime and CLI parsing/scenario functions. Host CLI file-output plumbing was checked through acceptance after implementation; no earlier failing I/O run was captured. Do not interpret the record as a complete test-first history for every scaffolding/plumbing line.

`offline-*.txt` contains actual outputs from the guarded runs; `run-*.json` contains actual CLI output, separately from hand-authored expected examples. A guard blocks standard Node network APIs and is inherited by npm/Vitest/CLI child Node processes. It does not establish OS isolation or stop arbitrary native subprocess networking.

See [the walkthrough status](../../walkthroughs/stage-1.md) for criterion-level limitations and the creator's pending checklist.
