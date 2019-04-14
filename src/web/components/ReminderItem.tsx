import dayjs from 'dayjs';
import React from 'react';
import { IChatSettings, IReminder } from '../../shared/types/database';

interface IReminderProps extends IReminder {
  socket: SocketIOClient.Socket;
}

export default function ReminderItem({
  socket,
  timestamp,
  text,
  id,
}: IReminderProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();

    const el = e.target as HTMLAnchorElement;
    const reminderId = el.dataset.id;

    socket.emit('delete reminder', reminderId);
  };

  return (
    <div>
      <a href="#" data-id={id} onClick={handleDelete}>
        Delete
      </a>
      &nbsp;
      {dayjs(+timestamp).format('DD-MM-YYYY HH:MM:ss')} - {text}
    </div>
  );
}
