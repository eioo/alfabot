import * as TelegramBot from 'node-telegram-bot-api';

import { config } from '../shared/env';
import { logger } from '../shared/logger';
import * as api from './api';
import * as commands from './cmds';
import RemindCommand from './cmds/remind';
import * as database from './database';
import * as schedules from './schedules';

export let bot: TelegramBot;

export async function create(): Promise<void> {
  const token = config.bot.token;

  if (!token) {
    logger.bot('No token in env.');
    return process.exit(1);
  }

  bot = new TelegramBot(token);

  await database.setup();
  await schedules.start();
  await commands.loadCommands();

  const remindCommand = commands.cmdList.remind as RemindCommand;
  await remindCommand.loadReminders();

  api.start();
  bot.on('message', messageHandler);
  bot.startPolling();

  logger.bot('Bot started');
}

async function messageHandler(msg: TelegramBot.Message) {
  await database.addNewChat(msg.chat.id);
}
