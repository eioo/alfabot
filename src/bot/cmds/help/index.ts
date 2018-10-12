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
  const title = `*Alfabot*`;
  const cmdLines = cmdList
    .map(cmd => {
      const left = `/${cmd.name.padEnd(8, ' ')}`;
      const right = cmd.helpText ? ` - ${cmd.helpText}` : '';

      return `\`${left}${right}\``;
    })
    .join('\n');

  return `${title}\n${cmdLines}`;
}

export function helpSingle(command: string | CommandBase): string {
  const help = (cmd: CommandBase) =>
    `\`/${cmd.name}\ ${cmd.helpArgs}\`\n${cmd.helpText}`;

  if (typeof command === 'string') {
    const cmdObj = getCommand(command);

    if (!cmdObj) {
      return 'Komentoa ei löydy.';
    }

    return help(cmdObj);
  }

  return help(command);
}

export default HelpCommand;
