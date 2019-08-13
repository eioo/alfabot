import { RecurrenceRule } from 'node-schedule';
import * as TelegramBot from 'node-telegram-bot-api';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Bot = TelegramBot;

export type IOnTextCallback = (
  msg: TelegramBot.Message,
  args: string[],
  argCount: number
) => void;

export interface IScheduleItem {
  name: string;
  rules: IScheduleRule[];
}

export type IScheduleRule = Partial<Omit<RecurrenceRule, 'nextInvocationDate'>>;
