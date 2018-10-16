import * as dateFormat from 'dateformat'
import { forecast } from './openWeatherMap';

export async function getForecastText(cityName: string, limit: number = 8): Promise<string>  {
  const data = await forecast.getByCityName(cityName);

  const items = data.list.slice(0, limit + 1);
  const forecastLines = items
    .map(item => {
      const icon = weatherIcons[item.weather[0].icon];
      const time = dateFormat(new Date(item.dt * 1000), 'HH:MM');
      const temp = item.main.temp.toFixed(1);

      return `\`${icon.padEnd(3, ' ')} ${time.padEnd(8, ' ')} ${temp}°C\``;
    })
    .join('\n');

  if (!forecastLines) {
    return 'error';
  }

  return `*${data.city.name}*\n${forecastLines}`;
}

export const weatherIcons = {
  '01d': '☀️',
  '01n': '☀️',
  '02d': '⛅️',
  '02n': '⛅️',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧',
  '09n': '🌧',
  '10d': '🌦',
  '10n': '🌦',
  '11d': '⛈',
  '11n': '⛈',
  '13d': '🌨',
  '13n': '🌨',
  '50d': '🌫',
  '50n': '🌫',
};
