import { IScheduleList } from '@shared/types';
import * as blazeIt from './blazeit';

export const schedules: IScheduleList = [
  {
    name: 'blazeItNight',
    rule: {
      hour: 4,
      minute: 20,
    },
    action: blazeIt.action,
  },
  {
    name: 'blazeItDay',
    rule: {
      hour: 16,
      minute: 20,
    },
    action: blazeIt.action,
  },
];
