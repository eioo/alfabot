import { RecurrenceRule, scheduleJob } from 'node-schedule';
import { db } from 'shared/database';
import { IChatSettings } from 'shared/types/database';

import { schedules } from './rules';

export async function start() {
  const chats: IChatSettings[] = await db('chats').select('*');

  for (const chat of chats) {
    const { enabled } = chat.schedules;

    for (const schedule of schedules) {
      const rules = Array.isArray(schedule.rules)
        ? schedule.rules
        : [schedule.rules];

      for (const rule of rules) {
        const reccurenceRule = new RecurrenceRule();

        for (const [unit, value] of Object.entries(rule)) {
          reccurenceRule[unit] = value;
        }

        scheduleJob(schedule.name, reccurenceRule, async () => {
          const chatNow = await db('chats').where('id', chat.chatid);

          if (!chatNow.schedule.enabled.includes(schedule.name)) {
            return;
          }

          runSchedule(schedule.name, chat.chatid);
        });
      }
    }
  }
}

export function runSchedule(scheduleName: string, chatId: number) {
  import(`./${scheduleName}`).then(importedSchedule => {
    const { action } = importedSchedule;
    action(chatId);
  });
}
