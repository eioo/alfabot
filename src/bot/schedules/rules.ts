import * as schedule from 'node-schedule';
import { IScheduleItem } from '../../shared/types/index';

export const schedules: IScheduleItem[] = [
  {
    name: 'mornings',
    rules: [
      {
        hour: 7,
        minute: 0,
        dayOfWeek: [new schedule.Range(0, 5)],
      },
    ],
  },
];
