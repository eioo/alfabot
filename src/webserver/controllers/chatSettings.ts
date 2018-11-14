import * as hapi from 'hapi';
import { db } from 'shared/database';

export const handler = async (request: hapi.Request, reply: any) => {
  const { chatId } = request.params;

  if (!chatId) {
    return;
  }

  const chat = await db('chats')
    .select('*')
    .where('chatid', Number(chatId))
    .first();

  return chat;
};
