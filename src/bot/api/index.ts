import * as Fastify from 'fastify';
import { config } from 'shared/env';
import { logger } from 'shared/logger';
import { getReminders, knex } from '../database';

const fastify = Fastify();

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.post('/reminders', async (request, reply) => {
  const chatId = Number(request.query.chatId);

  if (!chatId) {
    return;
  }

  const reminders = await getReminders(chatId);
  return reminders;
});

export async function start() {
  try {
    await fastify.listen(config.api.port);
    logger.info(`API Server listening on ${config.api.port}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}
