import CommandBase from 'bot/cmds/commandBase';
import { weather } from 'shared/api/openWeatherMap';
import Bot from 'shared/types/bot';

class WeatherCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'weather';
    this.helpText = 'Show weather';
    this.helpArgs = '[city]';
  }

  listen(): void {
    this.onText(/^\/weather/i, async (msg, args, argCount) => {
      if (!argCount) {
        return this.showHelp(msg);
      }

      if (argCount === 1) {
        const reply = await this.reply(msg, `_Ladataan..._`);
        const data = await weather.getByCityName(args[0]);
        const temp = data.main.temp.toFixed(2);

        return this.editReply(reply, `${temp}°C`);
      }

      this.showHelp(msg);
    });
  }
}

export default WeatherCommand;
