import { Request, ResponseToolkit, Server } from 'hapi';
import { logger } from 'shared/logger';
import routes from './routes';

const server = new Server({
  port: process.env.WEBSERVER_PORT || 3000,
  routes: {
    validate: {
      failAction: async (request: Request, h: ResponseToolkit, err: Error) => {
        logger.error(err);
        throw err;
      },
    },
  },
});

server.route(routes);

export const init = async () => {
  await server.start();
  logger.bot(`Webserver running at: ${server.info.uri}`);
};

export const stopServer = async () => {
  return server.stop();
};
