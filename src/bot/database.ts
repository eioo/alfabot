import * as Knex from 'knex';
import { config } from '../shared/env';

export const knex = Knex({
  client: 'pg',
  connection: config.database,
  searchPath: ['public'],
});

export async function getReminders(chatId: number) {
  const reminders = await knex('reminders')
    .select('*')
    .where('chatid', chatId);

  return reminders;
}
