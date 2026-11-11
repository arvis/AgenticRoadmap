import { z } from 'zod';
import type { Issue, Options, Result, TraceEvent } from './contracts.js';
import { getIssue } from './fixture.js';

const id = z.string().regex(/^ISSUE-\d{3}$/);
const taskSchema = z.strictObject({ issueId: id.optional() });
const argsSchema = z.strictObject({ issueId: id });
const roleSchema = z.strictObject({
  name: z.string().min(1), responsibilities: z.string().min(1), context: z.string().min(1),
  allowedTools: z.array(z.literal('get_issue')),
  completion: z.string().min(1), clarification: z.string().min(1)
});
const responseSchema = z.discriminatedUnion('type', [
  z.strictObject({ type: z.literal('tool_call'), name: z.string(), input: z.unknown() }),
  z.strictObject({ type: z.literal('final'), text: z.string().trim().min(1).max(500) })
]);

export function runAgent(taskInput: unknown, options: Options): Result {
  let steps = 0;
  let toolCalls = 0;
  const trace: TraceEvent[] = [];
  const record = (event: string, detail: string) => trace.push({ sequence: trace.length + 1, event, detail });
  const fail = (error: string): Result => {
    record('terminated', error);
    return { status: 'FAILED', error, steps, toolCalls, trace };
  };
  const task = taskSchema.safeParse(taskInput);
  if (!task.success) return fail('INVALID_TASK');
  const maxSteps = options.maxSteps === undefined ? 3 : options.maxSteps;
  if (!Number.isInteger(maxSteps) || maxSteps < 1 || maxSteps > 5) return fail('INVALID_RUN_CONFIG');
  const role = roleSchema.safeParse(options.role);
  if (!role.success) return fail('INVALID_ROLE');
  const issueId = task.data.issueId;
  if (!issueId) {
    record('terminated', 'NEEDS_INPUT');
    return { status: 'NEEDS_INPUT', question: 'Which issue ID should I look up?', steps, toolCalls, trace };
  }
  const results: Issue[] = [];
  while (steps < maxSteps) {
    steps++;
    let raw: unknown;
    try {
      // Copies prevent an adapter from changing the runtime's role or previous results.
      raw = options.model({ task: { issueId }, role: structuredClone(role.data), results: structuredClone(results) });
    } catch {
      return fail('MODEL_FAILED');
    }
    const response = responseSchema.safeParse(raw);
    if (!response.success) return fail('INVALID_MODEL_OUTPUT');
    const decision = response.data;
    record('model', decision.type === 'final' ? 'final' : decision.name);
    if (decision.type === 'final') {
      record('terminated', 'COMPLETED');
      return { status: 'COMPLETED', answer: decision.text, steps, toolCalls, trace };
    }
    if (decision.name !== 'get_issue' || !role.data.allowedTools.includes(decision.name)) {
      record('tool_denied', decision.name);
      return fail('TOOL_DENIED');
    }
    const args = argsSchema.safeParse(decision.input);
    if (!args.success) return fail('INVALID_TOOL_INPUT');
    record('tool_allowed', 'get_issue');
    try {
      toolCalls++;
      const issue = (options.getIssue ?? getIssue)(args.data.issueId);
      results.push(structuredClone(issue));
      record('tool_result', JSON.stringify(issue));
    } catch {
      return fail('TOOL_FAILED');
    }
  }
  return fail('STEP_LIMIT');
}
