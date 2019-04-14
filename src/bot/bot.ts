import * as TelegramBot from 'node-telegram-bot-api';

import { knex } from 'bot/database';
import { config } from 'shared/env';
import { logger } from 'shared/logger';
import * as api from './api';
import * as commands from './cmds';
import * as schedules from './schedules';

export let bot: TelegramBot;

export async function create(): Promise<void> {
  const token = config.bot.token;

  if (!token) {
    logger.bot('No token in env.');
    return process.exit(1);
  }

  bot = new TelegramBot(token);

  bot.on('message', messageHandler);
  schedules.start();
  commands.loadCommands();

  api.start();
  bot.startPolling();

  logger.bot('Bot started');
}

async function messageHandler(msg: TelegramBot.Message) {
  const chat = await knex('chats')
    .where('chatid', msg.chat.id)
    .first();

  if (chat) {
    return;
  }

  await knex('chats').insert({
    chatid: msg.chat.id,
  });
}
