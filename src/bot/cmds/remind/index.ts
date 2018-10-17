
import CommandBase from 'bot/cmds/commandBase';
import * as dateFormat from 'dateformat';
import * as schedule from 'node-schedule';
import * as parseDuration from 'parse-duration';
import { db } from 'shared/database';
import { logger } from 'shared/logger';
import Bot from 'shared/types/bot';
import { IReminder } from 'shared/types/database';

class RemindCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'remind';
    this.helpText = 'Reminds you';
    this.helpArgs = '<time option> <message>';
    this.helpDescription = '*Example*\n\`/remind 1 day just a reminder\`';

    this.loadReminders();
  }

  listen(): void {
    const durationRegex = /^\d+ ?\w+ /;

    this.onText(/^\/remind(me|er)? /i, async (msg, args) => {
      const { from } = msg;
      const argsJoined = args.join(' ');
      const duration = parseDuration(argsJoined);

      if (!from) {
        return;
      }

      if (!durationRegex.test(argsJoined)) {
        return this.showHelp(msg, 'Could not parse parameters');
      }

      if (!duration || duration < 0) {
        return this.showHelp(msg, 'Could not parse duration');
      }

      const now = new Date().getTime();
      const chatid = msg.chat.id;
      const timestamp = +new Date(now + duration);
      const text = argsJoined.replace(durationRegex, '').trim();
      const asker = from.first_name;

      const reminder: IReminder = {
        chatid,
        timestamp,
        text,
        asker,
      };

      this.scheduleReminder(reminder);

      this.reply(msg, [
        '*Reminder set!*',
        `\`When:\` ${dateFormat(new Date(timestamp))}`,
        `\`Text:\` ${reminder.text}`,
      ].join('\n'));
    });
  }

  async scheduleReminder(reminder: IReminder): Promise<void> {
    const { timestamp, asker, text } = reminder;
    await db('reminders').insert(reminder)

    schedule.scheduleJob(new Date(timestamp), async () => {
      this.bot.sendMessage(reminder.chatid, `*🔔 Reminder for* @${asker}\n_${text}_`, {
        parse_mode: 'Markdown',
      });
    });
  }

  async loadReminders(): Promise<void> {
    const now = +new Date();
    const reminders: IReminder[] = await db('reminders').where('timestamp', '>', now);
    const count = reminders.length;

    for (const reminder of reminders) {
      if (reminder.timestamp < now) {
        continue;
      }

      this.scheduleReminder(reminder);
    }

    count && logger.bot(`Loaded ${count} reminders from database`);
  }
}

export default RemindCommand;
