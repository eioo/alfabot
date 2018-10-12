import Bot from '@bot';
import { RecurrenceRule, scheduleJob } from 'node-schedule';
import { schedules } from './rules';

export function start(bot: Bot): void {
  for (const schedule of schedules) {
    const rule = new RecurrenceRule();

    for (const [unit, value] of Object.entries(schedule.rule)) {
      rule[unit] = value;
    }

    const job = scheduleJob(schedule.name, rule, () => {
      schedule.action(bot);
    });

  }
}


