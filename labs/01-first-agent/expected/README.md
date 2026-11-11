# Hand-authored expected examples

These are explanations, not captured runs or benchmark results.

| Scenario | Status/error | Model steps | Handler calls | Exit |
| --- | --- | --- | --- | --- |
| happy, ISSUE-001 | COMPLETED | 2 | 1 | 0 |
| happy, missing ID | NEEDS_INPUT | 0 | 0 | 0 |
| malformed | FAILED / INVALID_TOOL_INPUT | 1 | 0 | 1 |
| denied | FAILED / TOOL_DENIED | 1 | 0 | 1 |
| looping | FAILED / STEP_LIMIT | 3 | 3 | 1 |
| unchanged starter | FAILED / NOT_IMPLEMENTED | 0 | 0 | 1 |

Completed happy answer: `ISSUE-001: Repair the build (open). The build fails because a required type is missing.`

Actual author runs are recorded separately in the course evidence directory. Each valid invocation saves the same JSON it prints into artifacts/<scenario>.json; later runs of the same scenario overwrite that generated file, so copy evidence you need before running another case.
