import CommandBase from 'bot/cmds/commandBase';
import { knex } from 'bot/database';
import { config } from 'shared/env';
import Bot from 'shared/types/bot';
import { IChatSettings } from 'shared/types/database';
import { validateCity } from './openWeatherMap';
import { getForecastText } from './responseBuilder';

class WeatherCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.helpText = 'Show weather forecasts';
    this.helpArgs = '[city]';
  }

  listen(): void {
    this.onText(/^\/(weather|sää)/i, async (msg, args, argCount) => {
      if (!config.bot.openWeatherMapKey) {
        this.reply(msg, '😞 OpenWeatherMap token is not set');
        return;
      }

      if (!argCount) {
        const chat: IChatSettings = await knex('chats')
          .where({
            chatid: msg.chat.id,
          })
          .first();

        if (chat.weather.cities.length) {
          const reply = await this.reply(msg, `_Loading..._`);

          const forecastPromises = chat.weather.cities.map(async cityName => {
            const forecastText = await getForecastText(cityName);
            return forecastText;
          });
          const response = (await Promise.all(forecastPromises)).join('\n\n');

          if (!response) {
            this.editReply(reply, 'Failed to fetch weather :(');
            return;
          }

          this.editReply(reply, response);
          return;
        }

        this.showHelp(msg, 'No cities yet added. Visit* /panel *to add more.');
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
