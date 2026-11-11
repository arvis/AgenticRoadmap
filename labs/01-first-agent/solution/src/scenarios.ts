import type { Model } from './contracts.js';
export function scriptedModel(scenario: string): Model {
  return context => {
    if (scenario === 'denied') return { type: 'tool_call', name: 'delete_issue', input: {} };
    if (scenario === 'malformed') return { type: 'tool_call', name: 'get_issue', input: { issueId: 123 } };
    if (context.results.length && scenario !== 'looping') {
      const issue = context.results[0]!;
      return { type: 'final', text: `${issue.id}: ${issue.title} (${issue.status}). ${issue.description}` };
    }
    return { type: 'tool_call', name: 'get_issue', input: { issueId: context.task.issueId } };
  };
}
