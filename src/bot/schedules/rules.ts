import * as schedule from 'node-schedule';
import { IScheduleList } from '../../shared/types';

export const schedules: IScheduleList = [
  {
    name: 'mornings',
    rules: {
      hour: 7,
      minute: 0,
      dayOfWeek: [new schedule.Range(0, 5)],
    },
  },
];
