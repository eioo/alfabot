import * as TelegramBot from 'node-telegram-bot-api';
import WeatherCommand from './weather';
import HelpCommand from './help';
import CommandBase from './commandBase';

const commands = [
  WeatherCommand,
  HelpCommand
];

export const cmdList: CommandBase[] = [];

export function load(bot: TelegramBot) {
  for (const Command of commands) {
    const cmd = new Command(bot);
    cmd.listen && cmd.listen();
    cmdList.push(cmd);
  }
}