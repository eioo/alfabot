import { cmdList } from '../';

export function getAllHelpTexts(): string {
  const cmdLines = Object.values(cmdList)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(cmd => {
      if (!cmd.visible) {
        return;
      }

      const left = `/${cmd.name.padEnd(8, ' ')}`;
      const right = cmd.helpText ? ` - ${cmd.helpText}` : '';

      return `\`${left}${right}\``;
    })
    .filter(x => x)
    .join('\n');

  return `*Commands*\n${cmdLines}\n\n\`/help <command>\` to get more help.`;
}

export function getHelpText(command: string): string {
  const cmd = cmdList[command];

  if (cmd) {
    const helpArgs = cmd.helpArgs || '';
    const helpText = cmd.helpText || '';
    const helpDesc = cmd.helpDescription ? `\n${cmd.helpDescription}` : '';

    return [`\`/${cmd.name}\ ${helpArgs}\``, helpText, helpDesc].join('\n');
  }

  return 'Command not found.';
}
