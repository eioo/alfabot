import * as Knex from 'knex';

import { config } from '../shared/env';
import { IChatSettings, IReminder } from '../shared/types/database';

export const knex = Knex({
  client: 'pg',
  connection: config.database,
  searchPath: ['public'],
});

export async function getChat(chatId: number): Promise<IChatSettings> {
  const chat = await knex('chats')
    .select('*')
    .where('chatid', chatId)
    .first();

  return chat;
}

export async function setChat(chatSettings: IChatSettings) {
  await knex('chats')
    .where('chatid', chatSettings.chatid)
    .update(chatSettings);
}

export async function getReminders(chatId: number) {
  const now = +new Date();
  const reminders: IReminder[] = await knex('reminders')
    .select('*')
    .where('chatid', chatId)
    .andWhere('timestamp', '>', now);

  return reminders.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
}

export async function deleteReminder(reminderId: number) {
  await knex('reminders')
    .where('id', reminderId)
    .del();
}
