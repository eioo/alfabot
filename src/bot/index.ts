import * as dotenv from 'dotenv';

dotenv.config()
process.env.NTBA_FIX_319 = '1';

import { createBot } from './bot';

createBot();