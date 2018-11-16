import { validateCity } from 'bot/cmds/weather/openWeatherMap';
import * as hapi from 'hapi';
import * as _ from 'lodash';
import { db } from 'shared/database';
import { IChatSettings } from 'shared/types/database';

interface IAddCityData {
  chatId: number;
  cityName: string;
}

type IRemoveCityData = IAddCityData;

export const addCityHandler = async (request: hapi.Request) => {
  const data: IAddCityData = JSON.parse(request.payload as string);
  const { chatId, cityName } = data;

  const chat: IChatSettings = await db('chats')
    .where('chatid', chatId)
    .first();

  if (!chat) {
    return {
      status: 'error',
      error: 'chat not found',
    };
  }

  const validCity = await validateCity(cityName);

  if (!validCity) {
    return {
      status: 'error',
      error: 'invalid city',
    };
  }

  const { weather } = chat;
  weather.cities.push(_.capitalize(cityName));

  await db('chats')
    .where('chatid', chatId)
    .update({
      weather,
    });

  return {
    status: 'ok',
  };
};

export const removeCityHandler = async (request: hapi.Request) => {
  const data: IRemoveCityData = JSON.parse(request.payload as string);
  const { chatId, cityName } = data;

  const chat: IChatSettings = await db('chats')
    .where('chatid', chatId)
    .first();

  if (!chat) {
    return {
      status: 'error',
      error: 'chat not found',
    };
  }

  const { weather } = chat;
  weather.cities = weather.cities.filter(x => x !== cityName);

  await db('chats')
    .where('chatid', chatId)
    .update({
      weather,
    });

  return {
    status: 'ok',
  };
};
