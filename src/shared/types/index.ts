export interface IDatabaseChat {
  weather?: IDatabaseWeather;
}

export interface IDatabaseWeather {
  places?: string[];
  notifications?: boolean;
}

export type IDatabase = IDatabaseChat[];
