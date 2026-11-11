# Write the tests here

Start with `unhappy.test.ts` after planning. Import `runAgent` from `../src/agent.js` and use the exported types in `../src/contracts.js`. The starter compiles but returns NOT_IMPLEMENTED. Your assertions should describe required behavior, not accept that placeholder.

Write invalid task/configuration, denied tool, malformed arguments/output, tool failure, and exhausted-limit cases first. Use `vi.fn()` handlers/adapters and assert they were not called on rejected input. See lesson 3 for a starting example. After recording that red run, add happy-path tests before implementing success. The reference test suite is separate; do not copy it as evidence that you wrote tests first.
