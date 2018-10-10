import { Message } from 'node-telegram-bot-api';

export interface IDatabaseChat {
  weather?: IDatabaseWeather;
}

export interface IDatabaseWeather {
  places?: string[];
  notifications?: boolean;
}

export type IDatabase = IDatabaseChat[];

export type IOnTextCallback = (msg: Message, args: string[], argCount: number) => void;
