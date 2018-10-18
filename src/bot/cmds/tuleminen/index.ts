import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

class TuleminenCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'tuleminen';
    this.helpText = 'Tulemiskomento';
    this.helpArgs = '';
  }

  listen(): void {
    this.onText(/(tulen|tulin|tulee)/i, async msg => {
      this.reply(msg, 'paperia?? :D');
    });
  }
}

export default TuleminenCommand;
