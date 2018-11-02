import { Request, ResponseToolkit, Server } from 'hapi';
import routes from './routes';

const server = new Server({
  port: 3000,
  routes: {
    validate: {
      failAction: async (request: Request, h: ResponseToolkit, err: Error) => {
        console.error(err);
        throw err;
      },
    },
  },
});

server.route(routes);

export const init = async () => {
  await server.start();
  console.info(`Alfabot webserver running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.error(err);
  console.error(err.stack);
});

export const stopServer = async () => {
  return server.stop();
};
