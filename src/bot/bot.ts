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

  const bot = new TelegramBot(token);

  messageHandler(bot);
  schedules.start(bot);
  commands.load(bot);
  await webserver.init();
  bot.startPolling();

  logger.bot('Bot started');
}

function messageHandler(bot: TelegramBot) {
  bot.on('message', async msg => {
    const chat = await db('chats')
      .select('*')
      .where('chatid', msg.chat.id)
      .first();

    if (!chat) {
      await db('chats').insert({
        chatid: msg.chat.id,
      });
    }
  });
}
