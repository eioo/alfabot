import { db } from 'shared/database';
import { IChatSettings } from 'shared/types/database';

export async function getChatSettings(
  chatId: number,
  fn: (chatSettings: IChatSettings) => void
) {
  const chat = await db('chats')
    .where('chatid', Number(chatId))
    .first();

  fn(chat || {});
}
