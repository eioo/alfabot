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
<<<<<<< HEAD
    this.onText(/([^a-z]|.{0})tul(?!(li|va))|([^a-z]|.{0})tuu/i, async msg => {
=======
    this.onText(/([^a-z]tul(?!(li|va))|[^a-z]tuu)/i, async msg => {
>>>>>>> 4aa165fe1685667ca5783561cdc6e8366b974312
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
