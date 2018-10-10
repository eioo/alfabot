import CommandBase from '@base';
import Bot from '@bot';
import { cmdList, getCommand } from '..';

class HelpCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'help';
    this.helpText = 'Show help'
    this.helpArgs = '[command]'
  }

  listen(): void {
    this.onText(/^\/help/i, async (msg, args, argCount) => {
      if (argCount === 1) {
        this.reply(msg, this.helpSingle(args[0]));
        return;
      }

      this.reply(msg, this.helpAll());
    });
  }

  helpAll(): string {
    const title = `*Alfabot*`;
    const cmdLines = cmdList.map(cmd => {
      const left = `/${cmd.name.padEnd(8, ' ')}`;
      const right = cmd.helpText ? ` - ${cmd.helpText}` : '';

      return `\`${left}${right}\``;
    }).join('\n');

    return `${title}\n${cmdLines}`;
  }

  helpSingle(cmdName: string): string {
    const cmd = getCommand(cmdName);
    if (!cmd) {
      return 'Komentoa ei löydy.';
    }

    const text = `\`/${cmd.name}\ ${cmd.helpArgs}\`\n${cmd.helpText}`
    return text;
  }
}

export default HelpCommand;
