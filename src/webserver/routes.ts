import { logger } from 'shared/logger';
import { Server } from 'socket.io';
import { getChatSettings } from './controllers/chat';
import { getCommands } from './controllers/commands';
import { getReminders, removeReminder } from './controllers/reminders';
import { getSchedules, setScheduleState } from './controllers/schedules';
import { addCity, removeCity } from './controllers/weather';

export function routeSockets(io: Server) {
  io.on('connection', socket => {
    logger.socketio('Client connected');

    socket.on('get chat settings', getChatSettings);
    socket.on('get commands', getCommands);

    socket.on('get schedules', getSchedules);
    socket.on('set schedule state', async (data, fn) => {
      await setScheduleState(data, fn);
      socket.broadcast.emit('schedule state changed', data);
    });

    socket.on('add city', addCity);
    socket.on('remove city', removeCity);

    socket.on('get reminders', getReminders);
    socket.on('remove reminder', async (reminderId, fn) => {
      await removeReminder(reminderId, fn);
      socket.broadcast.emit('reminder removed', reminderId);
    });

    socket.on('disconnect', () => {
      logger.socketio('Client disconnected');
    });
  });
}
