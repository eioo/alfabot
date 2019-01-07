import { schedules } from 'bot/schedules/rules';
import { db } from 'shared/database';
import { IScheduleList } from 'shared/types';
import { IChatSettings } from 'shared/types/database';
import { ISocketResponse } from 'shared/types/sockets';

export interface IScheduleData {
  chatId: number;
  scheduleName: string;
  newState: boolean;
}

export async function getSchedules(
  chatId: number,
  fn: (schedules: IScheduleList) => void
) {
  await db('chats')
    .where('chatid', chatId)
    .select('schedules');

  fn(schedules);
}

export async function setScheduleState(
  { chatId, scheduleName, newState }: IScheduleData,
  fn: (response: ISocketResponse) => void
) {
  const chat: IChatSettings = await db('chats')
    .where({ chatid: chatId })
    .get(0);

  if (!chat) {
    return fn({
      error: 'chat not found',
    });
  }

  const newSchedules = (() => {
    const { enabled } = chat.schedules;

    if (newState && !enabled.includes(scheduleName)) {
      return [...enabled, scheduleName];
    }

    if (!newState && enabled.includes(scheduleName)) {
      return enabled.filter(x => x !== scheduleName);
    }

    return enabled;
  })();

  await db('chats')
    .where('chatid', chatId)
    .update({
      schedules: {
        enabled: newSchedules,
      },
    });

  fn({});
}
