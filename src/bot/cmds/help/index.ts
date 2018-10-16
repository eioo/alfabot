import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';
import { cmdList, getCommand } from '..';

class HelpCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'help';
    this.helpText = 'Show help';
    this.helpArgs = '[command]';
  }

  listen(): void {
    this.onText(/^\/help/i, async (msg, args, argCount) => {
      if (argCount === 1) {
        this.reply(msg, helpSingle(args[0]));
        return;
      }

      this.reply(msg, helpAll());
    });
  }
}

export function helpAll(): string {
  const title = `*Commands*`;
  const cmdLines = cmdList
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

  return `${title}\n${cmdLines}`;
}

export function helpSingle(command: string | CommandBase): string {
  const help = (base: CommandBase) =>
    `\`/${base.name}\ ${base.helpArgs}\`\n${base.helpText}`;

  if (typeof command === 'string') {
    const cmdClass = getCommand(command);

    if (!cmdClass) {
      return 'Command not found.';
    }

    return help(cmdClass);
  }

  return help(command);
}

export default HelpCommand;
