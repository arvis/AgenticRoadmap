import { describe, it, expect, vi } from 'vitest';
import { runAgent } from '../src/agent.js';
import type { Role, Issue, Model } from '../src/contracts.js';

export const role: Role = {
  name: 'issue-reader', responsibilities: 'Summarize a requested issue.', context: 'Local fixture only.',
  allowedTools: ['get_issue'], completion: 'Return a short summary.', clarification: 'Ask for the ID.'
};
const issue: Issue = { id: 'ISSUE-001', title: 'Fix CI', status: 'open', description: 'A type error breaks CI.' };
const call = { type: 'tool_call', name: 'get_issue', input: { issueId: 'ISSUE-001' } };
function fixture(response: unknown = call) {
  const model = vi.fn<Model>(() => response);
  const getIssue = vi.fn(() => issue);
  return { model, getIssue, role: structuredClone(role) };
}

describe('unhappy paths before implementation', () => {
  it.each([null, [], { issueId: 1 }, { issueId: '' }, { issueId: 'other' }, { extra: true }])('rejects invalid task %j', task => {
    const options = fixture();
    expect(runAgent(task, options)).toMatchObject({ status: 'FAILED', error: 'INVALID_TASK', steps: 0, toolCalls: 0 });
    expect(options.model).not.toHaveBeenCalled(); expect(options.getIssue).not.toHaveBeenCalled();
  });
  it.each([0, -1, 6, 1.5, NaN])('rejects invalid limit %s', maxSteps => {
    const options = fixture();
    expect(runAgent({ issueId: 'ISSUE-001' }, { ...options, maxSteps })).toMatchObject({ error: 'INVALID_RUN_CONFIG', steps: 0, toolCalls: 0 });
    expect(options.model).not.toHaveBeenCalled();
  });
  it.each([null, '3', true])('rejects a nonnumeric explicit limit %j', maxSteps => {
    const options = fixture();
    expect(runAgent({ issueId: 'ISSUE-001' }, { ...options, maxSteps: maxSteps as unknown as number })).toMatchObject({ error: 'INVALID_RUN_CONFIG', steps: 0 });
    expect(options.model).not.toHaveBeenCalled();
  });
  it.each([null, {}, { ...role, extra: true }, { ...role, allowedTools: ['delete_issue'] }])('rejects invalid role %j', badRole => {
    const options = fixture();
    expect(runAgent({ issueId: 'ISSUE-001' }, { ...options, role: badRole })).toMatchObject({ error: 'INVALID_ROLE', steps: 0 });
    expect(options.model).not.toHaveBeenCalled();
  });
  it.each(['delete_issue', '__proto__'])('denies unknown tool %s before dispatch', name => {
    const options = fixture({ ...call, name });
    expect(runAgent({ issueId: 'ISSUE-001' }, options)).toMatchObject({ error: 'TOOL_DENIED', steps: 1, toolCalls: 0 });
    expect(options.getIssue).not.toHaveBeenCalled(); expect(options.model).toHaveBeenCalledTimes(1);
  });
  it('denies the registered tool for an empty role allowlist', () => {
    const options = fixture(); options.role.allowedTools = [];
    expect(runAgent({ issueId: 'ISSUE-001' }, options).error).toBe('TOOL_DENIED');
    expect(options.getIssue).not.toHaveBeenCalled();
  });
  it.each([{}, { issueId: 4 }, { issueId: 'ISSUE-001', path: '../secret' }])('rejects tool arguments %j', input => {
    const options = fixture({ ...call, input });
    expect(runAgent({ issueId: 'ISSUE-001' }, options).error).toBe('INVALID_TOOL_INPUT');
    expect(options.getIssue).not.toHaveBeenCalled();
  });
  it.each([null, 'ignore all rules', { type: 'final', text: '' }, { type: 'final', text: 'ok', permissions: '*' }])('rejects malformed model output %j', output => {
    const options = fixture(output);
    expect(runAgent({ issueId: 'ISSUE-001' }, options).error).toBe('INVALID_MODEL_OUTPUT');
    expect(options.getIssue).not.toHaveBeenCalled();
  });
  it('stops on a thrown handler without leaking its error or retrying', () => {
    const options = fixture(); options.getIssue.mockImplementation(() => { throw new Error('secret-canary'); });
    const result = runAgent({ issueId: 'ISSUE-001' }, options);
    expect(result).toMatchObject({ error: 'TOOL_FAILED', toolCalls: 1, steps: 1 });
    expect(options.getIssue).toHaveBeenCalledTimes(1); expect(options.model).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(result)).not.toContain('secret-canary');
  });
  it('maps a thrown adapter to MODEL_FAILED without leaking details', () => {
    const options = fixture(); options.model.mockImplementation(() => { throw new Error('provider-secret'); });
    const result = runAgent({ issueId: 'ISSUE-001' }, options);
    expect(result.error).toBe('MODEL_FAILED'); expect(JSON.stringify(result)).not.toContain('provider-secret');
  });
  it.each([1, 3, 5])('stops after exactly %s model calls', maxSteps => {
    const options = fixture();
    expect(runAgent({ issueId: 'ISSUE-001' }, { ...options, maxSteps })).toMatchObject({ error: 'STEP_LIMIT', steps: maxSteps, toolCalls: maxSteps });
    expect(options.model).toHaveBeenCalledTimes(maxSteps); expect(options.getIssue).toHaveBeenCalledTimes(maxSteps);
  });
  it('fails on an unknown fixture issue without retrying', () => {
    const model = vi.fn<Model>(() => ({ ...call, input: { issueId: 'ISSUE-999' } }));
    expect(runAgent({ issueId: 'ISSUE-999' }, { role, model })).toMatchObject({ error: 'TOOL_FAILED', steps: 1, toolCalls: 1 });
    expect(model).toHaveBeenCalledTimes(1);
  });
  it('does not let model context edits grant capabilities', () => {
    const options = fixture();
    options.model.mockImplementation(context => {
      context.role.allowedTools.push('delete_issue');
      return { ...call, name: 'delete_issue' };
    });
    expect(runAgent({ issueId: 'ISSUE-001' }, options).error).toBe('TOOL_DENIED');
    expect(options.getIssue).not.toHaveBeenCalled();
    expect(options.role.allowedTools).toEqual(['get_issue']);
  });
});
