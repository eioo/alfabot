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
    this.onText(/^\/weather/i, async (msg, args, argCount) => {
      if (argCount === 0) {
        return this.showHelp(msg);
      }

      if (argCount === 1) {
        await this.setChatSettings(msg, {
          weather: {
            places: [args[0]],
          },
        });

        return this.reply(msg, `${args[0]}:n sää:\nHeheh`);
      }

      this.reply(msg, 'kys');
    });
  }
}

export default WeatherCommand;
