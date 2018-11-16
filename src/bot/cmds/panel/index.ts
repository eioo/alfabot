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
      this.reply(
        msg,
        `🤖 [Panel for this chat](http://${location.origin}/${msg.chat.id})\n${
          location.origin
        }/${msg.chat.id}`
      );
    });
  }
}

export default PanelCommand;
