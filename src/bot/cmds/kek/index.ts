import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

class KekCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.visible = false;
  }

  listen(): void {
    this.onText(/^kek$/i, async msg => {
      this.reply(msg, 'lol*', {
        parse_mode: 'HTML',
      });
    });
  }
}

export default KekCommand;
