import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

import { helpAll, helpSingle } from './helpTexts';

class HelpCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
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

export default HelpCommand;
