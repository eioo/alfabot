export interface IClouds {
  all: number;
}

export interface ICoord {
  lon: number;
  lat: number;
}

export interface IWeather {
  id:          number;
  main:        string;
  description: string;
  icon:        string;
}

export interface IWind {
  speed: number;
  deg:   number;
}

/*
  Current weather data
*/
export interface IOpenWeatherMapWeather {
  coord:      ICoord;
  weather:    IWeather[];
  base:       string;
  main:       IWeatherMain;
  visibility: number;
  wind:       IWind;
  clouds:     IClouds;
  dt:         number;
  sys:        IWeatherSys;
  id:         number;
  name:       string;
  cod:        number;
}

export interface IWeatherMain {
  temp:     number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export interface IWeatherSys {
  type:    number;
  id:      number;
  message: number;
  country: string;
  sunrise: number;
  sunset:  number;
}

/*
  5 day / 3 hour forecast
*/
export interface IOpenWeatherMapForecast {
  cod:     string;
  message: number;
  cnt:     number;
  list:    IForecastList[];
  city:    IForecastCity;
}

export interface IForecastCity {
  id:         number;
  name:       string;
  coord:      ICoord;
  country:    string;
  population: number;
}

export interface IForecastList {
  dt:      number;
  main:    IForecastMain;
  weather: IWeather[];
  clouds:  IClouds;
  wind:    IWind;
  rain:    IForecastRain;
  sys:     IForecastSys;
  dt_txt:  string;
}

export interface IForecastMain {
  temp:       number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  sea_level:  number;
  grnd_level: number;
  humidity:   number;
  temp_kf:    number;
}

export interface IForecastRain {
  '3h'?: number;
}

export interface IForecastSys {
  pod: string;
}