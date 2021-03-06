import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

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
