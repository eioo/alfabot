import CommandBase from 'bot/cmds/commandBase';
import { getReminders, knex } from 'bot/database';
import * as dateFormat from 'dateformat';
import * as schedule from 'node-schedule';
import * as parseDuration from 'parse-duration';
import { logger } from 'shared/logger';
import Bot from 'shared/types/bot';
import { IReminder } from 'shared/types/database';
import { api } from '../../api/index';

class RemindCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.helpText = 'Reminds you';
    this.helpArgs = '<time option> <message>';
    this.helpDescription = '*Example*\n`/remind 1 day just a reminder`';

    this.loadReminders();
  }

  listen(): void {
    const durationRegex = /^(-?[\d]+( +)?\w+( +)?){1,2}/i;

    this.onText(/^\/remind(me|er)?/i, async (msg, args) => {
      const { from } = msg;
      const argsJoined = args.join(' ').trim();
      const duration: number = parseDuration(argsJoined);
      const text = argsJoined.replace(durationRegex, '').trim();

      if (!from) {
        return;
      }

      if (args.length < 2) {
        return this.showHelp(msg, 'Not enough parameters');
      }

      if (!text) {
        return this.showHelp(msg, `There's no remind message`);
      }

      if (!duration || duration <= 0 || !durationRegex.test(argsJoined)) {
        return this.showHelp(msg, 'Could not parse duration');
      }

      const now = new Date().getTime();
      const chatid = msg.chat.id;
      const timestamp = +new Date(now + duration);
      const askername = from.first_name;
      const askerid = from.id;

      const reminder: IReminder = {
        chatid,
        timestamp,
        text,
        askername,
        askerid,
      };

      reminder.id = await knex('reminders')
        .insert(reminder)
        .returning('id')
        .get(0);

      this.scheduleReminder(reminder);
      this.updateWeb(reminder.chatid);

      this.reply(msg, [
        '*Reminder set!*',
        `\`When:\` ${dateFormat(new Date(timestamp))}`,
        `\`Text:\` ${reminder.text}`,
      ]);
    });
  }

  async scheduleReminder(reminder: IReminder): Promise<void> {
    const { id, timestamp, askername, askerid, text } = reminder;
    const reminderDate = parseInt(timestamp.toString(), 10);

    if (reminderDate < +new Date()) {
      return;
    }

    schedule.scheduleJob(new Date(reminderDate), async () => {
      const stillExists = (await knex('reminders').where('id', id || -1))
        .length;

      if (!stillExists) {
        return;
      }

      this.updateWeb(reminder.chatid);

      this.reply(
        reminder.chatid,
        `*🔔 Reminder for* [${askername}](tg://user?id=${askerid})\n_${text}_`
      );
    });
  }

  async loadReminders(): Promise<void> {
    const now = +new Date();
    const reminders: IReminder[] = await knex('reminders').where(
      'timestamp',
      '>',
      now
    );

    if (!reminders.length) {
      return;
    }

    for (const reminder of reminders) {
      this.scheduleReminder(reminder);
    }

    logger.bot(`Loaded ${reminders.length} reminders from database`);
  }

  async updateWeb(chatId: number) {
    const reminders = await getReminders(chatId);
    const room = String(chatId);
    api.in(room).emit('get reminders', reminders);
  }
}

export default RemindCommand;
