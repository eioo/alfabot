import TimePicker from 'rc-time-picker';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { IScheduleItem } from '../../../shared/types';
import { IChatSettings } from '../../../shared/types/database';
import { capitalize } from '../../../shared/utils';
import Toggle from '../Toggle';

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

  const handleClick = () => {
    const index = enabled.indexOf(schedule.name);
    index === -1 ? enabled.push(schedule.name) : enabled.splice(index, 1);
    socket.emit('set chat', chat);
  };

  const handleEnableChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    scheduleName: string
  ) => {
    const { checked } = event.currentTarget;

    if (checked) {
      console.log('create schedule', scheduleName);
    } else {
      console.log('cancel schedule', scheduleName);
    }
  };

  return (
    <Row>
      <Col>
        <Toggle onChange={e => handleEnableChange(e, schedule.name)}>
          {capitalize(schedule.name)}
          <TimePicker showSecond={false} />
        </Toggle>
      </Col>
      <Col />
    </Row>
  );
}
