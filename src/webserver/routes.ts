import { chatSettings, commands, healthCheck, weather } from './controllers';
import { GET, POST } from './utils/route';

const routes = [
  GET('/api/healthcheck', healthCheck.handler),
  GET('/api/chatsettings/{chatId}', chatSettings.handler),
  GET('/api/commands', commands.handler),
  POST('/api/weather/add', weather.addHandler),
  POST('/api/weather/remove', weather.removeHandler),
];

export default routes;
