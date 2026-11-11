import type { Options, Result } from './contracts.js';
// Write your tests first. Implement validation and the bounded tool loop here.
export function runAgent(_task: unknown, _options: Options): Result {
  return { status: 'FAILED', error: 'NOT_IMPLEMENTED', steps: 0, toolCalls: 0,
    trace: [{ sequence: 1, event: 'terminated', detail: 'NOT_IMPLEMENTED' }] };
}
