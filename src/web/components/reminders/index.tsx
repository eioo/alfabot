import React, { useEffect, useState } from 'react';

import { IChatSettings, IReminder } from '../../../shared/types/database';
import ReminderItem from './ReminderItem';

interface IRemindersProps {
  chat: IChatSettings;
  socket: SocketIOClient.Socket;
}

export default function Reminders({ chat, socket }: IRemindersProps) {
  const [reminders, setReminders] = useState<IReminder[]>();

  useEffect(() => {
    socket.emit('get reminders', chat.chatid);

    socket.on('get reminders', (data: IReminder[]) => {
      setReminders(data);
    });

    return () => {
      socket.off('get reminders');
    };
  }, []);

  const renderReminders = () => {
    if (!reminders) {
      return 'Loading reminders...';
    }

    if (!reminders.length) {
      return 'No reminders';
    }

    return reminders.map(reminder => (
      <ReminderItem key={reminder.id} socket={socket} reminder={reminder} />
    ));
  };

  return (
    <div>
      <h3>Reminders</h3>
      {renderReminders()}
    </div>
  );
}
