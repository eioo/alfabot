import { RecurrenceRule, scheduleJob } from 'node-schedule';
import Bot from 'shared/types/bot';
import { schedules } from './rules';

export function start(bot: Bot): void {
  for (const schedule of schedules) {
    const recRule = new RecurrenceRule();

    for (const [unit, value] of Object.entries(schedule.rule)) {
      recRule[unit] = value;
    }

    scheduleJob(schedule.name, recRule, () => {
      schedule.action(bot);
    });

    return;
  }
}
