import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

class PanelCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'panel';
    this.helpText = 'Example command';
    this.helpArgs = '[somearg] [otherarg]';
  }

  listen(): void {
    this.onText(/^\/panel/i, async msg => {
      // TODO: we need to get REMOTE url
      this.reply(
        msg,
        `🤖 [Panel for this chat](http://localhost:1234/${
          msg.chat.id
        })\nhttp://localhost:1234/${msg.chat.id}`
      );
    });
  }
}

export default PanelCommand;
