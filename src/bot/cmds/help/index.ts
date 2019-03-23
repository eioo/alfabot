import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

import { getAllHelpTexts, getHelpText } from './helpTexts';

class HelpCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.helpText = 'Show help';
    this.helpArgs = '[command]';
  }

  listen(): void {
    this.onText(/^\/help/i, async (msg, args, argCount) => {
      if (argCount === 1) {
        this.reply(msg, getHelpText(args[0]));
        return;
      }

      this.reply(msg, getAllHelpTexts());
    });
  }
}

export default HelpCommand;
