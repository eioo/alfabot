import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { IChatSettings } from '../../shared/types/database';
import { IScheduleItem } from '../../shared/types/index';

interface IScheduleItemProps {
  schedule: IScheduleItem;
  socket: SocketIOClient.Socket;
  chat: IChatSettings;
}

export default function ScheduleItem({
  chat,
  schedule,
  socket,
}: IScheduleItemProps) {
  const { enabled } = chat.schedules;
  const [active, setActive] = useState(enabled.includes(schedule.name));

  useEffect(() => {
    setActive(() => enabled.includes(schedule.name));
  }, [enabled]);

  const handleClick = () => {
    setActive(() => !active);

    const index = enabled.indexOf(schedule.name);
    index === -1 ? enabled.push(schedule.name) : enabled.splice(index, 1);
    socket.emit('set chat', chat);
  };

  return (
    <Button variant={active ? 'success' : 'danger'} onClick={handleClick}>
      {schedule.name}
    </Button>
  );
}
