import { Message } from 'node-telegram-bot-api';

export interface IChatSettings {
  weather?: IWeatherSettings;
}

export interface IWeatherSettings {
  places?: string[];
  notifications?: boolean;
}

export interface IDatabase {
  [chatId: number]: IChatSettings[];
}

export type IOnTextCallback = (msg: Message, args: string[], argCount: number) => void;

export type IScheduleList = Array<{
  name: string;
  rule: {
    year?: number;
    month?: number;
    date?: number;
    dayOfWeek?: number;
    hour?: number;
    minute?: number;
    second?: number;
  };
  action: Function;
}>
