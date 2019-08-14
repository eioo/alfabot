import { bot } from '../../bot';
import { getForecastText } from '../../cmds/weather/responseBuilder';
import { getChat } from '../../database';
import ScheduleBase from '../scheduleBase';

export default class extends ScheduleBase {
  async action(chatId: number) {
    const chat = await getChat(chatId);

    bot.sendMessage(
      chatId,
      chat.weather.cities.map(async city => getForecastText(city)).join('\n'),
      {
        parse_mode: 'Markdown',
      }
    );
  }
}
