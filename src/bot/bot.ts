import * as TelegramBot from 'node-telegram-bot-api';
import { db } from 'shared/database';
import { logger } from 'shared/logger';
import * as webserver from '../webserver';
import * as commands from './cmds';
import * as schedules from './schedules';

export async function create(): Promise<void> {
  const token = process.env.BOT_TOKEN || '';

  if (!token) {
    logger.bot('No token in env.');
    return process.exit(1);
  }

  await webserver.startServer();
  const bot = new TelegramBot(token);

  bot.on('message', messageHandler);
  schedules.start(bot);
  commands.load(bot);
  bot.startPolling();

  logger.bot('Bot started');
}

async function messageHandler(msg: TelegramBot.Message) {
  const chat = await db('chats')
    .where('chatid', msg.chat.id)
    .first();

  if (chat) {
    return;
  }

  await db('chats').insert({
    chatid: msg.chat.id,
  });
}
