import { Bot } from '../../../shared/types';
import CommandBase from '../commandBase';

class ExampleCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.helpText = 'Example command';
    this.helpArgs = '[somearg] [otherarg]';
  }

  listen(): void {
    this.onText(/^\/example/i, async msg => {
      this.reply(msg, 'Example command');
    });
  }
}

export default ExampleCommand;
