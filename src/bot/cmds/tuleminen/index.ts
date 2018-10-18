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
    this.onText(/\w?(tul[lei]+|lastit?|spermaa?|soos(s?i?t?)?)+?/i, async msg => {
      const answers = [
        'haluuks paperia?? :D',
        'kelpaisko pabers?',
        'tarviikko papruu :D',
        '*tirsk* mieti ny vähä et missä xD',
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
