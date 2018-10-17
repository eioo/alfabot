import CommandBase from 'bot/cmds/commandBase';
import * as dateFormat from 'dateformat';
import * as schedule from 'node-schedule';
import * as parseDuration from 'parse-duration';
import Bot from 'shared/types/bot';

class RemindmeCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'remind';
    this.helpText = 'Reminds you';
    this.helpArgs = '<time option> <message>';
    this.helpDescription = '*Example*\n\`/remind 1 day just a reminder\`';
  }

  listen(): void {
    this.onText(/^\/remind(me)?/i, async (msg, args) => {
      const { from } = msg;
      const regex = /^\d+ ?\w+ /;
      const argsJoined = args.join(' ');
      const duration = parseDuration(argsJoined);

      if (!from) {
        return;
      }

      if (!regex.test(argsJoined)) {
        return this.showHelp(msg, 'Could not parse parameters');
      }

      if (!duration) {
        return this.showHelp(msg, 'Could not parse duration');
      }

      const remindAsker = (`${from.first_name || ''} ${from.last_name || ''}`).trim();
      const remindText = argsJoined.replace(regex, '').trim();
      const remindDate = new Date(new Date().getTime() + duration);

      this.reply(msg, [
        '*Reminder set!*',
        `\`Date:\` ${dateFormat(remindDate)}`,
        `\`Text:\` ${remindText}`,
      ].join('\n'));

      schedule.scheduleJob(remindDate, () => {
        this.reply(msg, `*Reminder for ${remindAsker}*\n_${remindText}_`);
      });
    });
  }
}

export default RemindmeCommand;
