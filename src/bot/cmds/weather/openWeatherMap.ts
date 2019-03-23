import fetch from 'node-fetch';
import * as queryString from 'query-string';
import { isArray } from 'util';

import { IForecast, IWeather } from './types';

const APP_ID = process.env.OPENWEATHERMAP_KEY;
const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/';

const defaultOptions = {
  appid: APP_ID,
  lang: 'fi',
  units: 'metric',
};

async function query(
  apiEndpoint: string,
  params: object
): Promise<IForecast | IWeather> {
  const url = API_BASE_URL + apiEndpoint;
  const payload = queryString.stringify({
    ...params,
    ...defaultOptions,
  });

  const response = await fetch(`${url}?${payload}`);
  const json = await response.json();

  return json;
}

export const weather = {
  async getByCityName(cityName: string): Promise<IWeather> {
    const result = await query('weather', { q: cityName });
    return result as IWeather;
  },

  async getByCityId(cityId: string): Promise<IWeather> {
    const result = await query('weather', { id: cityId });
    return result as IWeather;
  },

  async getByGeoCoords(
    lat: number | string,
    lon: number | string
  ): Promise<IWeather> {
    const result = await query('weather', { lat, lon });
    return result as IWeather;
  },

  async getByZipCode(zipCode: number | string): Promise<IWeather> {
    const result = await query('weather', { zip: zipCode });
    return result as IWeather;
  },
};

export const forecast = {
  async getByCityName(cityName: string): Promise<IForecast> {
    const result = await query('forecast', { q: cityName });
    return result as IForecast;
  },

  async getByCityId(cityId: string): Promise<IForecast> {
    const result = await query('forecast', { id: cityId });
    return result as IForecast;
  },

  async getByGeoCoords(
    lat: number | string,
    lon: number | string
  ): Promise<IForecast> {
    const result = await query('forecast', { lat, lon });
    return result as IForecast;
  },

  async getByZipCode(zipCode: number | string): Promise<IForecast> {
    const result = await query('forecast', { zip: zipCode });
    return result as IForecast;
  },
};

export async function validateCity(cityName: string) {
  try {
    const resp = await weather.getByCityName(cityName);
    return resp.cod === 200;
  } catch {
    return false;
  }
}
