import { bot } from '../../bot';
import { getForecastText } from '../../cmds/weather/responseBuilder';
import { getChat } from '../../database';

export async function action(chatId: number): Promise<void> {
  const chat = await getChat(chatId);

  bot.sendMessage(
    chatId,
    chat.weather.cities.map(async city => getForecastText(city)).join('\n'),
    {
      parse_mode: 'Markdown',
    }
  );
}
