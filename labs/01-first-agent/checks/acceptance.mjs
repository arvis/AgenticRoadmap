import assert from 'node:assert/strict';
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

if (process.argv.length !== 3) throw new Error('Usage: node checks/acceptance.mjs <project-root>');
const root = realpathSync(resolve(process.argv[2]));
for (const name of ['package.json', 'role.json', 'dist/cli.js', 'dist/agent.js']) {
  assert.ok(existsSync(join(root, name)), `Missing ${name}; install and build the project first.`);
}
let checks = 0;
function check(label, test) { test(); checks++; console.log(`PASS ${label}`); }
function cli(args) {
  const child = spawnSync(process.execPath, [join(root, 'dist/cli.js'), ...args], {
    cwd: root, encoding: 'utf8', timeout: 8000, maxBuffer: 256 * 1024, shell: false
  });
  assert.ifError(child.error); assert.equal(child.signal, null);
  return child;
}
for (const [scenario, issue, status, error, steps, toolCalls, exit] of [
  ['happy', 'ISSUE-001', 'COMPLETED', undefined, 2, 1, 0],
  ['malformed', 'ISSUE-001', 'FAILED', 'INVALID_TOOL_INPUT', 1, 0, 1],
  ['denied', 'ISSUE-001', 'FAILED', 'TOOL_DENIED', 1, 0, 1],
  ['looping', 'ISSUE-001', 'FAILED', 'STEP_LIMIT', 3, 3, 1],
  ['happy', undefined, 'NEEDS_INPUT', undefined, 0, 0, 0]
]) {
  check(`CLI ${scenario} ${issue ?? '(missing ID)'}`, () => {
    const args = ['--scenario', scenario, ...(issue ? ['--issue', issue] : [])];
    const child = cli(args); assert.equal(child.status, exit); assert.equal(child.stderr, '');
    const result = JSON.parse(child.stdout);
    assert.equal(result.status, status); assert.equal(result.error, error);
    assert.equal(result.steps, steps); assert.equal(result.toolCalls, toolCalls);
    assert.equal(result.trace.at(-1).detail, error ?? status);
    assert.deepEqual(result.trace.map(x => x.sequence), result.trace.map((_, i) => i + 1));
    if (status === 'COMPLETED') { assert.match(result.answer, /ISSUE-001/); assert.match(result.answer, /Repair the build/); }
    if (status === 'NEEDS_INPUT') assert.ok(result.question.length > 0);
    assert.equal(readFileSync(join(root, 'artifacts', `${scenario}.json`), 'utf8'), child.stdout);
    assert.equal(cli(args).stdout, child.stdout, 'Repeated results must be deterministic');
  });
}
check('CLI rejects arbitrary scenario and output options', () => {
  for (const args of [['--scenario', '../escape'], ['--out', '../escape'], ['--scenario']]) {
    const child = cli(args); assert.equal(child.status, 2); assert.equal(child.stdout, '');
    assert.match(child.stderr, /Invalid CLI options/);
  }
});
const { runAgent } = await import(pathToFileURL(join(root, 'dist/agent.js')).href);
const role = JSON.parse(readFileSync(join(root, 'role.json'), 'utf8'));
function boundary(task, config, response, expected, expectedSteps = 0, expectedTools = 0) {
  let models = 0; let tools = 0;
  const result = runAgent(task, { role, ...config, model: () => { models++; return response; }, getIssue: id => {
    tools++; return { id, title: 'Sentinel', status: 'open', description: 'Fixture' };
  } });
  assert.equal(result.error, expected); assert.equal(models, expectedSteps); assert.equal(tools, expectedTools);
  assert.equal(result.steps, expectedSteps); assert.equal(result.toolCalls, expectedTools);
}
check('malformed task cannot call model or tool', () => boundary({ issueId: 42 }, {}, null, 'INVALID_TASK'));
check('invalid budget cannot start', () => boundary({ issueId: 'ISSUE-001' }, { maxSteps: 6 }, null, 'INVALID_RUN_CONFIG'));
check('invalid role cannot start', () => boundary({ issueId: 'ISSUE-001' }, { role: { ...role, allowedTools: ['delete_issue'] } }, null, 'INVALID_ROLE'));
check('empty allowlist denies handler execution', () => boundary({ issueId: 'ISSUE-001' }, { role: { ...role, allowedTools: [] } }, { type: 'tool_call', name: 'get_issue', input: { issueId: 'ISSUE-001' } }, 'TOOL_DENIED', 1));
check('extra model fields rejected', () => boundary({ issueId: 'ISSUE-001' }, {}, { type: 'final', text: 'hi', grant: '*' }, 'INVALID_MODEL_OUTPUT', 1));
check('extra tool arguments rejected', () => boundary({ issueId: 'ISSUE-001' }, {}, { type: 'tool_call', name: 'get_issue', input: { issueId: 'ISSUE-001', path: '../x' } }, 'INVALID_TOOL_INPUT', 1));
check('tool exceptions are bounded and not leaked', () => {
  let calls = 0;
  const result = runAgent({ issueId: 'ISSUE-001' }, { role,
    model: () => ({ type: 'tool_call', name: 'get_issue', input: { issueId: 'ISSUE-001' } }),
    getIssue: () => { calls++; throw new Error('acceptance-secret'); }
  });
  assert.equal(calls, 1); assert.equal(result.error, 'TOOL_FAILED'); assert.ok(!JSON.stringify(result).includes('acceptance-secret'));
});
check('unknown fixture issue fails', () => {
  assert.equal(runAgent({ issueId: 'ISSUE-999' }, { role, model: () => ({ type: 'tool_call', name: 'get_issue', input: { issueId: 'ISSUE-999' } }) }).error, 'TOOL_FAILED');
});
for (const limit of [1, 5]) check(`final answer at limit ${limit}`, () => {
  let models = 0;
  const result = runAgent({ issueId: 'ISSUE-001' }, { role, maxSteps: limit, model: () => ++models === limit
    ? { type: 'final', text: 'ISSUE-001 complete' }
    : { type: 'tool_call', name: 'get_issue', input: { issueId: 'ISSUE-001' } } });
  assert.equal(result.status, 'COMPLETED'); assert.equal(models, limit);
});
console.log(`${checks} acceptance checks passed. This verifies fixture behavior, not learner planning or production readiness.`);
