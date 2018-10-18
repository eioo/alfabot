import CommandBase from 'bot/cmds/commandBase';
import * as _ from 'lodash';
import Bot from 'shared/types/bot';

class TuleminenCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'tuleminen';
    this.helpText = 'Tulemiskomento';
    this.helpArgs = '';
  }

  listen(): void {
    this.onText(/([^a-z]|.{0})tul(?!(li|va))|([^a-z]|.{0})tuu/i, async msg => {
      const answers = [
        'paperia?? :D',
        'pabers?',
        'tarviikko papruu :D',
        '*tirsk*',
      ];
      const randomAnswer = _.sample(answers);

      if (!randomAnswer) {
        return;
      }

      this.reply(msg, randomAnswer);
    });
  }
}

export default TuleminenCommand;
