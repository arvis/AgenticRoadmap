export type Issue = { id: string; title: string; status: string; description: string };
export type Role = {
  name: string; responsibilities: string; context: string;
  allowedTools: string[]; completion: string; clarification: string;
};
export type ModelContext = {
  task: { issueId: string }; role: Role; results: Issue[];
};
export type Model = (context: ModelContext) => unknown;
export type Options = {
  role: unknown; model: Model; maxSteps?: number;
  getIssue?: (id: string) => Issue;
};
export type TraceEvent = { sequence: number; event: string; detail: string };
export type Result = {
  status: 'COMPLETED' | 'NEEDS_INPUT' | 'FAILED';
  answer?: string; question?: string; error?: string;
  steps: number; toolCalls: number; trace: TraceEvent[];
};
