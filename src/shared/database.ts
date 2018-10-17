import * as knex from 'knex';
import { Message } from 'node-telegram-bot-api';
import { logger } from './logger';
import { onChange } from './onChange';
import { IChat } from './types/database';

const { PG_HOST, PG_DATABASE, PG_USER, PG_PASS } = process.env;

if (!PG_HOST || !PG_DATABASE || !PG_USER || !PG_PASS) {
  logger.error('Fill in PostgreSQL database details in .env');
  process.exit();
}

export const db = knex({
  client: 'pg',
  connection: {
    host: PG_HOST,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASS,
  },
  searchPath: ['public'],
});

export async function getChat(chatIdOrMessage: number | Message): Promise<IChat> {
  const chatId = typeof chatIdOrMessage === 'number'
    ? chatIdOrMessage
    : chatIdOrMessage.chat.id;
  const chatExists = (await db('chats').where('chatId', chatId)).length;

  if (!chatExists) {
    await db('chats').insert({ chatId, });
  }

  const chat = await db('chats').select('*').where('chatId', chatId).first();
  const proxiedChat = onChange(chat, async () => {
    await saveChat(proxiedChat);
  });

  return proxiedChat;
}

export async function saveChat(chat: IChat): Promise<void> {
  const { chatid, ...rest } = chat;
  await db('chats').where('chatId', chatid).update(rest);
}
