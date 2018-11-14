import { chatSettings, healthCheck } from './controllers';
import { GET } from './utils/route';

const routes = [
  GET('/api/healthcheck', healthCheck.handler),
  GET('/api/chatsettings/{chatId}', chatSettings.handler),
];

export default routes;
