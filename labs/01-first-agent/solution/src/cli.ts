import { readFileSync, mkdirSync, writeFileSync, lstatSync, existsSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { parseOptions } from './cli-options.js';
import { runAgent } from './agent.js';
import { scriptedModel } from './scenarios.js';

// Trusted host plumbing. The agent receives no filesystem or process capability.
let options;
try { options = parseOptions(process.argv.slice(2)); }
catch { console.error('Invalid CLI options. Use --scenario happy|malformed|denied|looping and optional --issue ISSUE-001.'); process.exit(2); }
try {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const role: unknown = JSON.parse(readFileSync(join(root, 'role.json'), 'utf8'));
  const task = options.issueId === undefined ? {} : { issueId: options.issueId };
  const result = runAgent(task, { role, model: scriptedModel(options.scenario) });
  const directory = join(root, 'artifacts');
  if (existsSync(directory) && lstatSync(directory).isSymbolicLink()) throw new Error('Artifact directory link');
  mkdirSync(directory, { recursive: true });
  if (realpathSync(directory) !== join(realpathSync(root), 'artifacts')) throw new Error('Artifact path');
  const path = join(directory, `${options.scenario}.json`);
  if (existsSync(path) && lstatSync(path).isSymbolicLink()) throw new Error('Artifact file link');
  const json = JSON.stringify(result, null, 2) + '\n';
  writeFileSync(path, json);
  process.stdout.write(json);
  process.exitCode = result.status === 'FAILED' ? 1 : 0;
} catch {
  console.error('CLI_IO_FAILED: check the role JSON and project-local artifacts directory.');
  process.exitCode = 2;
}
