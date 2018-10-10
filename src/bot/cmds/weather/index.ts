import CommandBase from '../commandBase';
import * as TelegramBot from 'node-telegram-bot-api';

class WeatherCommand extends CommandBase {
  constructor(bot: TelegramBot) {
    super(bot);

    this.name = 'weather'
    this.helpText = 'Show weather'
    this.helpArgs = '[city]'
  }

  listen(): void {
    this.onText(/^\/weather/i, async (msg, args) => {
      this.reply(msg, 'Et saa');
    });
  }
}

export default WeatherCommand;