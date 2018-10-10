import CommandBase from '@base';
import Bot from '@bot';

class WeatherCommand extends CommandBase {
  constructor(bot: Bot) {
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
