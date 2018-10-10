import { logger } from '@logger';
import * as TelegramBot from 'node-telegram-bot-api';
import * as commands from './cmds';

const token = process.env.BOT_TOKEN || '';

if (!token) {
  logger.bot('No token in env.');
  process.exit(1);
}

export function createBot() {
  const bot = new TelegramBot(token);

  commands.load(bot);
  bot.startPolling();

  logger.bot('Bot started');
}
