import CommandBase from 'base';
import Bot from 'bot';

class ExampleCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'example'
    this.helpText = 'Example command'
    this.helpArgs = '[somearg] [otherarg]'
  }

  listen(): void {
    this.onText(/^\/example/i, async msg => {
      this.reply(msg, 'Example command');
    });
  }
}

export default ExampleCommand;
