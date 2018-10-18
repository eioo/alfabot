import CommandBase from 'bot/cmds/commandBase';
import * as _ from 'lodash';
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

  return `${title}\n${cmdLines}`;
}

export function helpSingle(command: string | CommandBase): string | string[] {
  const createText = (base: CommandBase): string[] => {
    const helpText = base.helpText || '';
    const helpDesc = base.helpDescription ? `\n${base.helpDescription}` : '';

    return [
      `\`/${base.name}\ ${base.helpArgs}\``,
      helpText,
      helpDesc,
    ];
  }

  const cmdClass = _.isString(command) ? getCommand(command) : command;
  return cmdClass ? createText(cmdClass) : 'Command not found.';
}

export default HelpCommand;
