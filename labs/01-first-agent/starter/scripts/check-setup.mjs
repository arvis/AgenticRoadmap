import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const [major, minor] = process.versions.node.split('.').map(Number);
if (major !== 24 || minor < 11) throw new Error('Use Node 24.11 or later within Node 24.x.');
for (const name of ['typescript', 'vitest', 'zod']) require.resolve(name);
if (!existsSync('tsconfig.json')) throw new Error('Run this command from the learner project root.');
console.log(`Setup ready: Node ${process.version}; dependencies available. Agent behavior is not checked.`);
