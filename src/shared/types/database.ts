export interface IChatSettings {
  chatid: number;
  weather: {
    cities: string[];
    enableNotifications: boolean;
  };
  schedules: {
    enabled: string[];
  };
}

export interface IReminder {
  id?: number;
  chatid: number;
  timestamp: number;
  text: string;
  askername: string;
  askerid: number;
}
