import { logger } from '@logger';
import * as TelegramBot from 'node-telegram-bot-api';
import * as commands from './cmds';
import * as schedules from './schedules';

export function create(): void {
  const token = process.env.BOT_TOKEN || '';

  if (!token) {
    logger.bot('No token in env.');
    return process.exit(1);
  }

  const bot = new TelegramBot(token);

  schedules.start(bot);
  commands.load(bot);
  bot.startPolling();

  logger.bot('Bot started');
}
