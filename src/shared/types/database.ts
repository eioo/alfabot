export interface IChat {
  chatId: string,
  weather: {
    cities: string[];
    enableNotifications: boolean;
  }
}
