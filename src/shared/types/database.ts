export interface IChat {
  chatid: number,
  weather: {
    cities: string[];
    enableNotifications: boolean;
  }
}

export interface IReminder {
  id?: number;
  chatid: number;
  timestamp: number;
  text: string;
  asker: string;
}
