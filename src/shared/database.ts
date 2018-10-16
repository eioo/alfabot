import * as knex from 'knex';
import { onChange } from './onChange';
import { IChat } from './types/database';

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST || '',
    database: process.env.PG_DATABASE || '',
    user: process.env.PG_USER || '',
    password: process.env.PG_PASS || '',
  },
  searchPath: ['public'],
});

async function getChat(chatId: number): Promise<IChat> {
  const chatExists = (await db('chats').where('chatId', chatId)).length;

  if (!chatExists) {
    await db('chats').insert({ chatId, });
  }

  const chat = await db('chats').select('*').where('chatId', chatId).first();
  const proxiedChat = onChange(chat, () => {
    saveChat(proxiedChat);
  });

  return proxiedChat;
}

async function saveChat(chat: IChat): Promise<void> {
  const { chatId, ...rest } = chat;
  await db('chats').where('chatId', chatId).update(rest);
}
