import * as hapi from 'hapi';
import { db } from 'shared/database';

export const handler = async (request: hapi.Request) => {
  const { chatId } = request.params;

  if (!chatId) {
    return;
  }

  const chat = await db('chats')
    .where('chatid', Number(chatId))
    .first();

  return chat || {};
};
