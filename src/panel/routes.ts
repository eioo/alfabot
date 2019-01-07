import Remind from './components/tabs/Remind';
import Schedules from './components/tabs/Schedules';
import Weather from './components/tabs/Weather';

export enum RouteType {
  basic = 1,
  command = 2,
}

interface IRoutes {
  [name: string]: {
    type: RouteType;
    component: () => JSX.Element;
  };
}

const routes: IRoutes = {
  schedules: {
    type: RouteType.basic,
    component: Schedules,
  },
  weather: {
    type: RouteType.command,
    component: Weather,
  },
  remind: {
    type: RouteType.command,
    component: Remind,
  },
};

export default routes;
