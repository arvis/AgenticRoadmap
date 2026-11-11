import { it, expect, vi } from 'vitest';
import { runAgent } from '../src/agent.js';
import type { Role, Model } from '../src/contracts.js';
const role: Role = { name: 'reader', responsibilities: 'Read issues', context: 'Fixture', allowedTools: ['get_issue'], completion: 'Summarize', clarification: 'Ask for ID' };
it('asks for missing input without model or tool calls', () => {
  const model = vi.fn<Model>(); const getIssue = vi.fn();
  expect(runAgent({}, { role, model, getIssue })).toMatchObject({ status: 'NEEDS_INPUT', steps: 0, toolCalls: 0, question: expect.any(String) });
  expect(model).not.toHaveBeenCalled(); expect(getIssue).not.toHaveBeenCalled();
});
it('passes task, role and real tool result to the model and completes deterministically', () => {
  const model = vi.fn<Model>(context => context.results.length
    ? { type: 'final', text: `${context.results[0]!.id}: ${context.results[0]!.title}` }
    : { type: 'tool_call', name: 'get_issue', input: { issueId: context.task.issueId } });
  const result = runAgent({ issueId: 'ISSUE-001' }, { role, model });
  expect(result).toMatchObject({ status: 'COMPLETED', answer: 'ISSUE-001: Repair the build', steps: 2, toolCalls: 1 });
  expect(result.trace.map(e => e.event)).toEqual(['model', 'tool_allowed', 'tool_result', 'model', 'terminated']);
  expect(result.trace.map(e => e.sequence)).toEqual([1, 2, 3, 4, 5]);
  expect(runAgent({ issueId: 'ISSUE-001' }, { role, model })).toEqual(result);
});
it.each([1, 3, 5])('allows a final answer on the last permitted step (%s)', maxSteps => {
  let calls = 0;
  const model = vi.fn<Model>(() => ++calls === maxSteps
    ? { type: 'final', text: 'ISSUE-001 complete' }
    : { type: 'tool_call', name: 'get_issue', input: { issueId: 'ISSUE-001' } });
  expect(runAgent({ issueId: 'ISSUE-001' }, { role, model, maxSteps })).toMatchObject({ status: 'COMPLETED', steps: maxSteps, toolCalls: maxSteps - 1 });
  expect(model).toHaveBeenCalledTimes(maxSteps);
});
