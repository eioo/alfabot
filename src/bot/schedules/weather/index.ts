import { bot } from 'bot/bot';
import { getForecastText } from 'bot/cmds/weather/responseBuilder';
import { getChat } from 'bot/database';

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
