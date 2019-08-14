import * as io from 'socket.io';

import {
  deleteReminder,
  getChat,
  getReminders,
  setChat,
} from '../../bot/database';
import { cancelSchedule, createSchedule } from '../../bot/schedules';
import { config } from '../../shared/env';
import { logger } from '../../shared/logger';
import { IScheduleRule } from '../../shared/types';
import { IChatSettings } from '../../shared/types/database';

export const api = io.listen(config.api.port);

interface IExtendedSocket extends io.Socket {
  room: string;
  sendToAllInRoom: (event: string, ...args: any[]) => void;
}

export function start() {
  api.on('connection', (socket: IExtendedSocket) => {
    logger.api('Socket connected');

    socket.on('get chat', async (chatId: number) => {
      const chat = await getChat(chatId);

      if (chat) {
        socket.room = String(chat.chatid);
        socket.join(socket.room);
      }

      socket.emit('get chat', chat);
    });

    socket.on('set chat', async (chatSettings: IChatSettings) => {
      await setChat(chatSettings);
      api.in(socket.room).emit('get chat', chatSettings);
    });

    socket.on('get reminders', async (chatId: number) => {
      const reminders = await getReminders(chatId);
      socket.emit('get reminders', reminders);
    });

    socket.on(
      'create schedule',
      (chatId: number, scheduleName: string, scheduleRule: IScheduleRule) => {
        createSchedule(chatId, scheduleName, scheduleRule);
      }
    );

    socket.on('cancel schedule', (chatId: number, scheduleName: string) => {
      cancelSchedule(chatId, scheduleName);
    });

    socket.on('delete reminder', async (reminderId: number) => {
      await deleteReminder(reminderId);

      const reminders = await getReminders(Number(socket.room));
      api.in(socket.room).emit('get reminders', reminders);
    });

    socket.on('disconnect', () => {
      logger.api('Socket disconnected');
    });
  });
}
