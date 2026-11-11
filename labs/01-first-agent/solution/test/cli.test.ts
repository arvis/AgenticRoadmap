import { it, expect } from 'vitest';
import { parseOptions } from '../src/cli-options.js';
import { scriptedModel } from '../src/scenarios.js';
import { runAgent } from '../src/agent.js';
const role = { name: 'reader', responsibilities: 'Read', context: 'Fixture', allowedTools: ['get_issue'], completion: 'Summary', clarification: 'Ask' };
it.each([['--out', '../x'], ['--scenario', '../x'], ['--scenario'], ['--issue'], ['--issue', 'ISSUE-001', '--issue', 'ISSUE-002']])('rejects CLI arguments %j', (...args) => {
  expect(() => parseOptions(args)).toThrow('Invalid CLI options');
});
it('parses a scenario and issue', () => {
  expect(parseOptions(['--scenario', 'happy', '--issue', 'ISSUE-001'])).toEqual({ scenario: 'happy', issueId: 'ISSUE-001' });
  expect(parseOptions([])).toEqual({ scenario: 'happy' });
});
it.each([
  ['happy', 'COMPLETED', undefined, 2, 1],
  ['malformed', 'FAILED', 'INVALID_TOOL_INPUT', 1, 0],
  ['denied', 'FAILED', 'TOOL_DENIED', 1, 0],
  ['looping', 'FAILED', 'STEP_LIMIT', 3, 3]
] as const)('runs scenario %s', (scenario, status, error, steps, toolCalls) => {
  const result = runAgent({ issueId: 'ISSUE-001' }, { role, model: scriptedModel(scenario) });
  expect(result).toMatchObject({ status, steps, toolCalls }); expect(result.error).toBe(error);
});
