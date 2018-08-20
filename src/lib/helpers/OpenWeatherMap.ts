import axios from 'axios';
import bot from '../../app';
import { IOpenWeatherMapResponse } from '../types';

const BASEURL = 'https://api.openweathermap.org/data/2.5';

export default class OpenWeatherMapHelper {
  constructor(private apiToken: string) {}

  private async fetchJSON(url: string, params?: object): Promise<object> {
    const response = await axios.get(url, {
      params: {
        appid: this.apiToken,
        lang: 'fi',
        units: 'metric',
        ...params,
      },
      responseType: 'json'
    });

    return response.data;
  }

  async getCurrentWeatherByCityName(cityName: string): Promise<IOpenWeatherMapResponse> {
    const url = BASEURL + '/weather';
    const weather = await this.fetchJSON(url, {
      q: cityName
    }) as IOpenWeatherMapResponse;

    return weather;
  }

  async getCurrentWeatherByCityID(cityId: number): Promise<IOpenWeatherMapResponse> {
    const url = BASEURL + '/weather';
    const weather = await this.fetchJSON(url, {
      id: cityId.toString()
    }) as IOpenWeatherMapResponse;

    return weather;
  }

  async getCurrentWeatherByGeoCoordinates(lat: number, lng: number): Promise<IOpenWeatherMapResponse> {
    const url = BASEURL + '/weather';
    const weather = await this.fetchJSON(url, {
      lat: lat.toString(),
      lng: lng.toString()
    }) as IOpenWeatherMapResponse;

    return weather;
  }
}