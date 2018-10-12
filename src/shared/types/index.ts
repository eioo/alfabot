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
