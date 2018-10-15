import { Message } from 'node-telegram-bot-api';
import { RecurrenceRule } from 'node-schedule';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

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
  rule: IScheduleRule;
  action: Function;
}>

type IScheduleRule = Partial<Omit<RecurrenceRule, 'nextInvocationDate'>>;