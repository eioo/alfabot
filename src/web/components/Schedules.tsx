import React from 'react';
import { schedules } from '../../bot/schedules/rules';
import { IChatSettings } from '../../shared/types/database';
import ScheduleItem from './ScheduleItem';

interface ISchedulesProps {
  chat: IChatSettings;
  socket: SocketIOClient.Socket;
}

export default function Schedules({ chat, socket }: ISchedulesProps) {
  if (!chat) {
    return <div>lol</div>;
  }

  return (
    <div>
      <h2>Schedules</h2>

      {Object.entries(schedules).map(([key, value]) => {
        return (
          <ScheduleItem
            key={key}
            schedule={value}
            socket={socket}
            chat={chat}
          />
        );
      })}
    </div>
  );
}
