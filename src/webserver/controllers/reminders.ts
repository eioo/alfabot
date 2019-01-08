import { db } from 'shared/database';
import { IReminder } from 'shared/types/database';
import { ISocketResponse } from 'shared/types/sockets';

interface IReminderData {
  chatId: number;
  reminderId: number;
}

export async function getReminders(
  chatId: number,
  fn: (reminders: IReminder[]) => void
) {
  const timestamp = +new Date();
  const reminders = await db('reminders')
    .where('timestamp', '>', timestamp)
    .where('chatid', chatId);

  fn(reminders);
}

export async function removeReminder(
  { chatId, reminderId }: IReminderData,
  fn: (response: ISocketResponse) => void
) {
  if (!chatId || !reminderId) {
    return fn({
      error: 'no chat/reminder id',
    });
  }

  await db('reminders')
    .where('chatid', chatId)
    .where('id', reminderId)
    .del();

  fn({});
}
