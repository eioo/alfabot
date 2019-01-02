import { db } from 'shared/database';
import { IReminder } from 'shared/types/database';

interface IRemoveReminderData {
  chatId: number;
  reminderId: number;
}

interface IRemoveReminderResponse {
  status: string;
}

export async function getReminders(fn: (reminders: IReminder[]) => void) {
  const timestamp = +new Date();
  const reminders = await db('reminders').where('timestamp', '>', timestamp);

  fn(reminders);
}

export async function removeReminder(
  data: IRemoveReminderData,
  fn: (response: IRemoveReminderResponse) => void
) {
  await db('reminders')
    .where('chatid', data.chatId)
    .where('id', data.reminderId)
    .del();

  fn({
    status: 'ok',
  });
}
