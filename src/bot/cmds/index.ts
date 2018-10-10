import * as TelegramBot from 'node-telegram-bot-api';
import CommandBase from './commandBase';
import HelpCommand from './help';
import WeatherCommand from './weather';

const commands = [
  WeatherCommand,
  HelpCommand,
];

export const cmdList: CommandBase[] = [];

export function getCommand(cmdName: string): CommandBase | undefined {
  return cmdList.find(x => x.name === cmdName);
}

export function load(bot: TelegramBot) {
  for (const Command of commands) {
    const cmd = new Command(bot);
    cmd.listen && cmd.listen();
    cmdList.push(cmd);
  }
}
