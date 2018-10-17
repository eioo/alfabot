import * as schedule from 'node-schedule';
import { IScheduleList } from 'shared/types';
import * as blazeit from './blazeit';
import * as mornings from './mornings';

export const schedules: IScheduleList = [
  {
    name: 'mornings',
    rule: {
      hour: 7,
      minute: 0,
      dayOfWeek: [new schedule.Range(0, 5)],
    },
    action: mornings.action,
  },
  {
    name: 'blazeitday',
    rule: {
      hour: 16,
      minute: 20,
      second: 30,
    },
    action: blazeit.action,
  },
  {
    name: 'blazeitnight',
    rule: {
      hour: 4,
      minute: 20,
      second: 30,
    },
    action: blazeit.action,
  },
];
