import { RecurrenceRule } from 'node-schedule';

export interface IChatSettings {
  chatid: number;
  weather: {
    cities: string[];
    notifications: boolean;
    notificationTime: RecurrenceRule;
  };
  schedules: {
    enabled: string[];
  };
}

export interface IReminder {
  id?: number;
  chatid: number;
  timestamp: number;
  text: string;
  askername: string;
  askerid: number;
}
