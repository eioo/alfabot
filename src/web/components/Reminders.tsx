import React, { useEffect, useState } from 'react';
import { IChatSettings, IReminder } from '../../shared/types/database';
import ReminderItem from './ReminderItem';

interface IRemindersProps {
  chat: IChatSettings;
  socket: SocketIOClient.Socket;
}

export default function Reminders({ chat, socket }: IRemindersProps) {
  const [reminders, setReminders] = useState<IReminder[]>(undefined);

  useEffect(() => {
    socket.emit('get reminders', chat.chatid);
    socket.on('get reminders', (data: IReminder[]) => {
      setReminders(data);
    });

    return () => {
      socket.off('get reminders');
    };
  }, []);

  return (
    <div>
      <h2>Reminders</h2>

      {!reminders
        ? 'Loading reminders...'
        : reminders.length
        ? reminders.map(reminder => (
            <ReminderItem
              key={reminder.id}
              socket={socket}
              reminder={reminder}
            />
          ))
        : 'No reminders'}
    </div>
  );
}
