import { Request, ResponseToolkit, Server } from 'hapi';
import { logger } from 'shared/logger';
import * as socketio from 'socket.io';
import { routeSockets } from './routes';

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

export async function startServer() {
  const io = socketio(server.listener);

  routeSockets(io);
  await server.start();

  logger.bot(`Webserver running at: ${server.info.uri}`);
}

export async function stopServer() {
  return server.stop();
}
