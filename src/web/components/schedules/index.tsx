import styled from '@emotion/styled';
import React from 'react';

import { schedules } from '../../../bot/schedules/rules';
import { IChatSettings } from '../../../shared/types/database';
import ScheduleItem from './ScheduleItem';

const ScheduleList = styled.div`
  display: grid;
  grid-auto-rows: 30px;
`;

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
      <h3>Schedules</h3>

      <ScheduleList>
        {Object.entries(schedules).map(([key, value]) => (
          <ScheduleItem
            key={key}
            schedule={value}
            socket={socket}
            chat={chat}
          />
        ))}
      </ScheduleList>
    </div>
  );
}
