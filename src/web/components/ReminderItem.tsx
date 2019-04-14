import styled from '@emotion/styled';
import dayjs from 'dayjs';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IReminder } from '../../shared/types/database';

const FloatRight = styled.div`
  float: right;
`;

const AskerName = styled.span`
  line-height: 30px;
`;

const Timestamp = styled.span`
  font-size: 14px;
  margin-right: 0.2rem;
`;

interface IReminderProps {
  socket: SocketIOClient.Socket;
  reminder: IReminder;
}

export default function ReminderItem({ socket, reminder }: IReminderProps) {
  const { askername, timestamp, text, id } = reminder;

  const handleDelete = (reminderId: number) => {
    if (confirm('Are you sure you want to remove reminder?')) {
      socket.emit('delete reminder', reminderId);
    }
  };

  return (
    <Card style={{ marginBottom: '5px' }}>
      <Card.Header as="h5" style={{ padding: '5px' }}>
        <AskerName>{askername}</AskerName>

        <FloatRight>
          <Timestamp className="text-muted">
            {dayjs(+timestamp).format('HH:MM DD.MM.YYYY ')}
          </Timestamp>
          <Button size="sm" variant="danger" onClick={() => handleDelete(id)}>
            Remove
          </Button>
        </FloatRight>
      </Card.Header>

      <Card.Body style={{ padding: '5px' }}>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
