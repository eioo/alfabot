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
      const panelUrl = `http://${process.env.PANEL_HOST}/${msg.chat.id}`;

      this.reply(msg, `🤖 [Panel for this chat](${panelUrl})`);
    });
  }
}

export default PanelCommand;
