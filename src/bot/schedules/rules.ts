import { IScheduleList } from 'shared/types';
import * as blazeit from './blazeit';

export const schedules: IScheduleList = [
  {
    name: 'blazeit',
    rules: [
      {
        hour: 4,
        minute: 20,
        second: 30,
      },
      {
        hour: 15,
        minute: 20,
        second: 30,
      },
    ],
    action: blazeit.action,
  },
];
