import {
  chatSettings,
  commands,
  healthCheck,
  remind,
  weather,
} from './controllers';
import { DELETE, GET, POST } from './utils/route';

const routes = [
  GET('/api/healthcheck', healthCheck.handler),
  GET('/api/remind', remind.getHandler),
  GET('/api/chatsettings/{chatId}', chatSettings.handler),
  GET('/api/commands', commands.handler),
  POST('/api/weather', weather.addCityHandler),
  DELETE('/api/remind', remind.removeHandler),
  DELETE('/api/weather', weather.removeCityHandler),
];

export default routes;
