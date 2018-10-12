import * as dotenv from 'dotenv';
import { logger } from 'shared/logger';

dotenv.config();
process.env.NTBA_FIX_319 = '1';

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled rejection: ${err}`);
})

import * as bot from './bot';

bot.create();
