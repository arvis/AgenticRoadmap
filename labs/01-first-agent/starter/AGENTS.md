# Learner instruction template

Complete after planning and before asking an assistant to implement behavior. Fill the TODOs; retain these working rules.

- Read PLAN.md and docs/specs/001-first-agent.md. Finish task planning and resolve blocking questions before coding.
- Write tests before behavior, unhappy paths first. Run them and observe intended failures before implementation. Add happy-path tests before implementing success.
- Implement minimally, verify, refactor, and record actual commands/results.
- Layout: TODO describe src/, test/, docs/, role.json, and trusted CLI plumbing.
- Commands: TODO verify npm ci, npm run check:setup, npm run typecheck, npm run build, npm test, and demo commands.
- Review: compare the diff with the spec and inspect actual evidence. Do not claim unrun checks passed.
- Follow company policy for approved assistants, data handling, required reviews, and releases.
- End each completed stage with required checks and a scoped local commit; retain its hash. A checkpoint is not production promotion.
- Boundaries: TODO describe get_issue, role permissions, and step limits. Written rules do not enforce these controls.
