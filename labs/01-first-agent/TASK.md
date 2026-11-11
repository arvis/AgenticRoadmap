# Your task

> Build an assistant that looks up a project issue and gives me a short summary.

First identify what this request leaves unspecified. Read your supplied `PLAN.md` and write questions about inputs, tools, outcomes, stopping, verification, and allowed actions. Then use [CLARIFICATIONS.md](CLARIFICATIONS.md) as the stakeholder answers.

Finish your learner `docs/specs/001-first-agent.md` and `docs/planning-readiness.md` before writing tests or implementation. Record your reasoning rather than copying the reference solution. Leave optional assistant-loading checks unverified if you work manually.

Deliver a completed specification and repository instructions, behavior tests with original failing/passing evidence, `role.json`, the agent loop, scenario JSON/traces, controlled defect/repair evidence, and a local completion commit.

Your app is a console program. The source fixture and script plumbing are supplied; you implement validation, permissions, and the bounded model/tool loop in `src/agent.ts`. The model's script is deterministic, making the outcomes reproducible. You are not training a model or calling a live provider.
