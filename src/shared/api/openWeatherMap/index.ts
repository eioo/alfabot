import fetch from 'node-fetch';
import * as queryString from 'query-string';
import { IForecast, IWeather } from './types';

const APP_ID = process.env.OPENWEATHERMAP_TOKEN;
const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/'

const defaultOptions = {
  appid: APP_ID,
  lang: 'fi',
  units: 'metric',
};

async function query(apiEndpoint: string, params: object): Promise<IForecast | IWeather> {
  const url = API_BASE_URL + apiEndpoint;
  const body = queryString.stringify({
    ...params,
    ...defaultOptions,
  });

  const response = await fetch(url, { body });
  const json = await response.json();

  return json;
}

export const weather = {
  async getByCityName(cityName: string): Promise<IWeather> {
    const result = await query('forecast', { q: cityName });
    return result as IWeather;
  },

  async getByCityId(cityId: string): Promise<IWeather> {
    const result = await query('forecast', { id: cityId });
    return result as IWeather;
  },

  async getByGeoCoords(lat: number | string, lon: number | string): Promise<IWeather> {
    const result = await query('forecast', { lat, lon });
    return result as IWeather;
  },

  async getByZipCode(zipCode: number | string): Promise<IWeather> {
    const result = await query('forecast', { zip: zipCode });
    return result as IWeather;
  },
}

export const forecast = {
  async getByCityName(cityName: string): Promise<IForecast> {
    const result = await query('forecast', { q: cityName });
    return result as IForecast;
  },

  async getByCityId(cityId: string): Promise<IForecast> {
    const result = await query('forecast', { id: cityId });
    return result as IForecast;
  },

  async getByGeoCoords(lat: number | string, lon: number | string): Promise<IForecast> {
    const result = await query('forecast', { lat, lon });
    return result as IForecast;
  },

  async getByZipCode(zipCode: number | string): Promise<IForecast> {
    const result = await query('forecast', { zip: zipCode });
    return result as IForecast;
  },
}
