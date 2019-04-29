import { knex } from 'bot/database';
import { RecurrenceRule, scheduleJob } from 'node-schedule';
import { IChatSettings } from 'shared/types/database';

import { schedules } from './rules';

export async function start() {
  const chats: IChatSettings[] = await knex('chats').select('*');

  for (const chat of chats) {
    for (const schedule of schedules) {
      for (const rule of schedule.rules) {
        const reccurenceRule = new RecurrenceRule();

        for (const [unit, value] of Object.entries(rule)) {
          reccurenceRule[unit] = value;
        }

        createSchedule(chat.chatid, schedule.name, reccurenceRule);
      }
    }
  }
}

function createSchedule(
  chatId: number,
  scheduleName: string,
  reccurenceRule: RecurrenceRule
) {
  scheduleJob(scheduleName, reccurenceRule, async () => {
    const chatNow: IChatSettings = await knex('chats')
      .select('*')
      .where('chatid', chatId)
      .get(0);

    if (!chatNow.schedules.enabled.includes(scheduleName)) {
      return;
    }

    runSchedule(chatId, scheduleName);
  });
}

export function runSchedule(chatId: number, scheduleName: string) {
  import(`./${scheduleName}`).then(({ action }) => {
    action(chatId);
  });
}
