# Issue lookup assistant ? learner project plan

Build a small TypeScript console agent with a read-only issue tool and deterministic mock model. The user supplies an optional issue ID; the agent either asks for it or follows a bounded model/tool loop to a result. Runtime permissions must be explicit and testable.

Use supplied fixtures and tooling. No real provider, filesystem/network tools, writes, MCP, multi-agent workflow, or production deployment. The CLI may save result JSON as trusted host plumbing. Keep source, tests, and documentation in this project.

Before coding, derive `docs/specs/001-first-agent.md` from this plan and the course clarification worksheet. Finish scope, constraints, failure behavior, implementation steps, and acceptance checks. Then write tests, unhappy paths first, capture their expected failures, implement minimally, and verify. Keep the assistant choice independent of the program.

Completion requires your specification, instructions, tests/evidence, working agent, trace, defect/repair exercise, and a local Git checkpoint. Branch/merge exercises begin later. Respect company policy.
