# Reference project instructions

Read PLAN.md and docs/specs/001-first-agent.md. Finish planning before coding; update affected planning before changes. Write unhappy-path tests before behavior, observe intended failures, then add happy-path tests before successful implementation. Implement minimally, verify, and refactor.

Source lives in src/, tests in test/, process records in docs/. role.json supplies developer-authored configuration. The CLI explicitly loads it; no automatic assistant discovery is inherited. Runtime membership/validation/step checks enforce the tool boundary.

Commands: npm ci; npm run check:setup; npm run typecheck; npm run build; npm test; npm run demo -- --scenario happy --issue ISSUE-001. Initial installation can require network. Tests/demos require no provider credentials.

Inspect the diff and evidence, report actual checks and limitations, and commit completed stage work locally after checks. Follow company policy for assistants, data, review, and release. This fixture lab does not certify production readiness or authorize production-main promotion.
