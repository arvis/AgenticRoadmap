# 0001 — Console-app implementation language

Status: proposed; awaiting the language decision before implementation.
Date: 2026-11-11.

## Context

Stage 1 needs a small terminal application with explicit task, role, tool, and result contracts; deterministic offline scenarios; and behavior tests. The [project plan](../../PLAN.md#5-technical-architecture) already prefers TypeScript for labs and the website. The author has a Java/backend background. An optional VS Code extension is a later goal.

## Proposal

Use TypeScript on Node.js for the console application, with Zod for runtime validation and Vitest for tests as already proposed in the plan. Keep the CLI separate from the agent/tool logic so future interfaces can invoke the same behavior. Compile/typecheck explicitly; TypeScript types do not replace validation at runtime.

This keeps the initial course focused on one implementation language across labs and the planned website. It also offers a straightforward language match for the optional extension: [VS Code's official extension tutorial](https://code.visualstudio.com/api/get-started/your-first-extension) scaffolds TypeScript or JavaScript projects. The later extension does not dictate the console-app interface or become a prerequisite.

## Alternatives considered

| Option | Project-specific trade-off |
| --- | --- |
| TypeScript on Node.js | Matches the current plan and planned web stack; requires a concise orientation for learners coming from Java or another language |
| Java | Familiar to the author; introduces a separate language/runtime from the planned website and changes the current lab tooling/specification |
| Python | Another viable console implementation; introduces a separate language/runtime from the planned website and changes the current lab tooling/specification |

The deciding criteria are teaching clarity, reproducible local setup, explicit contracts, and keeping the first release manageable. No performance or model-quality comparison has been run or is needed to claim these project-fit trade-offs.

## Consequences and decision status

- Confirm the language before scaffolding or writing runtime tests. If another language is selected, update the plan, Stage 1 spec, commands, and test tooling first.
- Ship one language track initially; additional language variants require separate scope decisions.
- Keep the course independent of any particular coding assistant or editor.
- Select and record actual dependency/runtime versions during implementation.

Reference: [Node.js introduction to TypeScript](https://nodejs.org/learn/typescript/introduction), including the distinction between static types and runtime behavior.
