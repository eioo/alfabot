import { logger } from '../shared/logger';

// Ignores warning from node-telegram-bot-api
process.env.NTBA_FIX_319 = '1';

process.on('unhandledRejection', (err: any) => {
  logger.error(`Unhandled rejection: ${err.stack}`);
});

import * as bot from './bot';
bot.create();
