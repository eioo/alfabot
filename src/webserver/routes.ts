import {
  chatSettings,
  commands,
  healthCheck,
  remind,
  weather,
} from './controllers';
import { GET, POST } from './utils/route';

const routes = [
  GET('/api/healthcheck', healthCheck.handler),
  GET('/api/chatsettings/{chatId}', chatSettings.handler),
  GET('/api/commands', commands.handler),
  POST('/api/weather/add', weather.addCityHandler),
  POST('/api/weather/remove', weather.removeCityHandler),
  GET('/api/remind', remind.getHandler),
  POST('/api/remind/remove', remind.removeHandler),
];

export default routes;
