import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';
import { validateCity } from './openWeatherMap';
import { getForecastText } from './responseBuilder';

class WeatherCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'weather';
    this.helpText = 'Show weather';
    this.helpArgs = '[city]';
  }

  listen(): void {
    this.onText(/^\/(weather|sää)/i, async (msg, args, argCount) => {
      if (!argCount) {
        this.showHelp(msg);
        return;
      }

      if (argCount === 1) {
        const reply = await this.reply(msg, `_Loading..._`);
        const cityName = args[0];
        const cityIsValid = await validateCity(cityName);

        if (!cityIsValid) {
          this.editReply(reply, `City doesn't exist`);
          return;
        }

        const response = await getForecastText(cityName);
        this.editReply(reply, response || 'Could not get forecast');
        return;
      }

      this.showHelp(msg);
    });
  }
}

export default WeatherCommand;
