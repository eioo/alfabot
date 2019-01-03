import { db } from 'shared/database';
import { IReminder } from 'shared/types/database';
import { ISocketResponse } from 'shared/types/sockets';

export async function getReminders(fn: (reminders: IReminder[]) => void) {
  const timestamp = +new Date();
  const reminders = await db('reminders').where('timestamp', '>', timestamp);

  fn(reminders);
}

export async function removeReminder(
  reminder: IReminder,
  fn: (response: ISocketResponse) => void
) {
  if (!reminder.id) {
    return;
  }

  await db('reminders')
    .where('chatid', reminder.chatid)
    .where('id', reminder.id)
    .del();

  fn({});
}
