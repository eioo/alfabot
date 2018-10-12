import { RecurrenceRule, scheduleJob } from 'node-schedule';
import Bot from 'shared/types/bot';
import { schedules } from './rules';

export function start(bot: Bot): void {
  for (const schedule of schedules) {
    if (schedule.rule) {
      const recRule = new RecurrenceRule();

      for (const [unit, value] of Object.entries(schedule.rule)) {
        recRule[unit] = value;
      }

      scheduleJob(schedule.name, recRule, () => {
        schedule.action(bot);
      });

      return;
    }

    if (schedule.rules) {
      schedule.rules.forEach((rule, i) => {
        const name = rule + i.toString();
        const recRule = new RecurrenceRule();

        for (const [unit, value] of Object.entries(rule)) {
          recRule[unit] = value;
        }

        scheduleJob(name, recRule, () => {
          schedule.action(bot);
        });
      });

      return;
    }
  }
}
