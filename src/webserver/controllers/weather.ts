import { validateCity } from 'bot/cmds/weather/openWeatherMap';
import * as _ from 'lodash';
import { db } from 'shared/database';
import { logger } from 'shared/logger';
import { IChatSettings } from 'shared/types/database';
import { ISocketResponse } from 'shared/types/sockets';

interface ICityData {
  chatId: number;
  cityName: string;
}

export async function addCity(
  data: ICityData,
  fn: (response: ISocketResponse) => void
) {
  const { chatId, cityName } = data;
  const chat: IChatSettings = await db('chats')
    .where('chatid', chatId)
    .first();

  if (!chat) {
    return fn({
      error: 'chat not found',
    });
  }

  const validCity = await validateCity(cityName);

  if (!validCity) {
    return fn({
      error: 'invalid city',
    });
  }

  const { weather } = chat;
  weather.cities.push(_.capitalize(cityName));

  await db('chats')
    .where('chatid', chatId)
    .update({
      weather,
    });

  fn({});
}

export async function removeCity(
  data: ICityData,
  fn: (response: ISocketResponse) => void
) {
  const { chatId, cityName } = data;

  const chat: IChatSettings = await db('chats')
    .where('chatid', chatId)
    .first();

  if (!chat) {
    fn({
      error: 'chat not found',
    });
    return;
  }

  const { weather } = chat;
  weather.cities = weather.cities.filter(x => x !== cityName);

  await db('chats')
    .where('chatid', chatId)
    .update({
      weather,
    });
}
