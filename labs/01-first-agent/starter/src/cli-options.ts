export type CliOptions = { scenario: string; issueId?: string };
export function parseOptions(argv: string[]): CliOptions {
  const values = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 2) {
    const flag = argv[i]; const value = argv[i + 1];
    if (!flag || !['--scenario', '--issue'].includes(flag) || !value || value.startsWith('--') || values.has(flag)) {
      throw new Error('Invalid CLI options');
    }
    values.set(flag, value);
  }
  const scenario = values.get('--scenario') ?? 'happy';
  if (!['happy', 'malformed', 'denied', 'looping'].includes(scenario)) throw new Error('Invalid CLI options');
  const issueId = values.get('--issue');
  return issueId === undefined ? { scenario } : { scenario, issueId };
}
