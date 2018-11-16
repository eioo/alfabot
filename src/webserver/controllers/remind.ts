import * as hapi from 'hapi';
import { db } from 'shared/database';

interface IRemoveRemindData {
  chatId: number;
  reminderId: number;
}

export const getHandler = async (request: hapi.Request) => {
  const reminders = await db('reminders').where('timestamp', '>', +new Date());
  return reminders;
};

export const removeHandler = async (request: hapi.Request) => {
  const data: IRemoveRemindData = JSON.parse(request.payload as string);

  await db('reminders')
    .where('chatid', data.chatId)
    .where('id', data.reminderId)
    .del();

  return {
    status: 'ok',
  };
};
