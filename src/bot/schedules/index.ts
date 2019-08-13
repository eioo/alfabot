import { Job, RecurrenceRule, scheduleJob } from 'node-schedule';

import { IScheduleRule } from '../../shared/types';
import { IChatSettings } from '../../shared/types/database';
import { knex } from '../database';
import { schedules } from './rules';

interface IJobs {
  [chatId: number]: {
    [scheduleName: string]: Job;
  };
}

const jobs: IJobs = {};

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

export function createSchedule(
  chatId: number,
  scheduleName: string,
  scheduleRule: IScheduleRule
) {
  const job = scheduleJob(scheduleName, scheduleRule, async () => {
    const chatNow: IChatSettings = await knex('chats')
      .select('*')
      .where('chatid', chatId)
      .first();

    if (!chatNow.schedules.enabled.includes(scheduleName)) {
      return;
    }

    runSchedule(chatId, scheduleName);
  });

  if (!jobs[chatId]) {
    jobs[chatId] = {};
  }

  jobs[chatId][scheduleName] = job;
}

export function cancelSchedule(chatId: number, scheduleName: string) {
  console.log('cancel schedule: ', scheduleName);
}

export function runSchedule(chatId: number, scheduleName: string) {
  import(`./${scheduleName}`).then(({ action }) => {
    if (action) {
      action(chatId);
    }
  });
}
