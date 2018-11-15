import CommandBase from 'bot/cmds/commandBase';
import _ from 'lodash';
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
  const cmdLines = cmdList
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

export function helpSingle(command: string | CommandBase): string {
  const createText = (base: CommandBase): string => {
    const helpArgs = base.helpArgs || '';
    const helpText = base.helpText || '';
    const helpDesc = base.helpDescription ? `\n${base.helpDescription}` : '';

    return [`\`/${base.name}\ ${helpArgs}\``, helpText, helpDesc].join('\n');
  };

  const cmdClass = _.isString(command) ? getCommand(command) : command;
  return cmdClass ? createText(cmdClass) : 'Command not found.';
}

export default HelpCommand;
