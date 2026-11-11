import type { Issue } from './contracts.js';
const issue: Issue = { id: 'ISSUE-001', title: 'Repair the build', status: 'open', description: 'The build fails because a required type is missing.' };
export function getIssue(id: string): Issue {
  if (id !== issue.id) throw new Error('Unknown issue');
  return structuredClone(issue);
}
