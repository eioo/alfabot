import * as Knex from 'knex';
import { IReminder } from 'shared/types/database';
import { config } from '../shared/env';

export const knex = Knex({
  client: 'pg',
  connection: config.database,
  searchPath: ['public'],
});

export async function getChat(chatId: number) {
  const chat = await knex('chats')
    .select('*')
    .where('chatid', chatId)
    .get(0);

  return chat;
}

export async function getReminders(chatId: number) {
  const now = +new Date();
  const reminders: IReminder[] = await knex('reminders')
    .select('*')
    .where('chatid', chatId)
    .andWhere('timestamp', '>', now);

  return reminders.sort((a, b) => (a.timestamp > b.timestamp ? 1 : 0));
}

export async function deleteReminder(reminderId: number) {
  await knex('reminders')
    .where('id', reminderId)
    .del();
}
