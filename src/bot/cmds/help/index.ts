import CommandBase from '../commandBase';
import * as TelegramBot from 'node-telegram-bot-api';
import { cmdList } from '..';

class HelpCommand extends CommandBase {
  constructor(bot: TelegramBot) {
    super(bot);

    this.name = 'help';
    this.helpText = 'Show help'
    this.helpArgs = '[command]'
  }

  listen(): void {
    this.onText(/^\/help/i, async (msg, args) => {
      const title = `*Alfabot*\n`;
      const response = title +
        cmdList.map(cmd => {
          const left = `/${cmd.name.padEnd(8, ' ')}`;
          const right = cmd.helpText ? ` - ${cmd.helpText}` : '';

          return `\`${left}${right}\``;
        }).join('\n');

      this.reply(msg, response);
    });
  }
}

export default HelpCommand;