export interface IForecast {
  cod: string;
  message: number;
  cnt: number;
  list: IList[];
  city: ICity;
}

export interface ICity {
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
}

export interface ICoord {
  lat: number;
  lon: number;
}

export interface IList {
  dt: number;
  main: IForecastMain;
  weather: IWeatherData[];
  clouds: IClouds;
  wind: IWind;
  sys: ISys;
  dt_txt: string;
  rain?: IRain;
}

export interface IClouds {
  all: number;
}

export interface IForecastMain {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface IRain {
  [key: string]: number;
}

export interface ISys {
  pod: string;
}

export interface IWeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWind {
  speed: number;
  deg: number;
}

// ------------------------------------------------------

export interface IWeather {
  coord: ICoord;
  weather: IWeatherData[];
  base: string;
  main: IWeatherMain;
  visibility: number;
  wind: IWind;
  clouds: IClouds;
  dt: number;
  sys: ISys;
  id: number;
  name: string;
  cod: number;
}

export interface IWeatherMain {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export interface ISys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}
