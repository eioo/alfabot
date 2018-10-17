import * as TelegramBot from 'node-telegram-bot-api';
import { logger } from 'shared/logger';
import * as commands from './cmds';
import * as schedules from './schedules';

export async function create(): Promise<void> {
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
