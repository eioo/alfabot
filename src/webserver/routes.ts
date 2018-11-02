import { healthCheck, weather } from './controllers';

import { GET } from './utils/route';

const routes = [
  GET('/api/healthcheck', healthCheck.check.handler),
  GET('/api/weather', weather.listCities.handler),
];

export default routes;
