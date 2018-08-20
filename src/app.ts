import * as dotenv from 'dotenv';
import Telegraf, { ContextMessageUpdate } from 'telegraf';
import OpenWeatherMapHelper from './lib/helpers/OpenWeatherMap';
import logger from './Logger';

dotenv.config();

export default class AlfaBot {
  bot: Telegraf<ContextMessageUpdate>;
  
  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN || '');
    this.setupHandlers();
    this.bot.startPolling();
    logger.log('Bot started');
  }

  private setupHandlers(): void {
    this.bot.hears('sää', async (ctx) => {
      const openWeatherMap = new OpenWeatherMapHelper(process.env.OWM_TOKEN || '');
      const weather = await openWeatherMap.getCurrentWeatherByCityName('Lahti');
      
      ctx.replyWithMarkdown(`*Sää:* ${ weather.main.temp } 'C`);
    });
  }
}

new AlfaBot();