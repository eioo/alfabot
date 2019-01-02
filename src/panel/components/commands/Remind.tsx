import dateFormat from 'dateformat';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { IReminder } from '../../../shared/types/database';
import { ControlPanelContext } from '../../containers/ControlPanel.context';
import { socket } from '../../services/sockets';
import { RemoveButton } from '../../theme';

const ReminderCount = styled.div`
  margin-bottom: 1rem;
`;

const ReminderItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const Column = styled.div`
  margin-right: 0.8rem;
`;

const TriggerTime = styled.span`
  white-space: nowrap;
  color: gray;
`;

const AskerName = styled.span`
  font-weight: bold;
`;

const RemindText = styled.span`
  color: black;
`;

export default function Remind() {
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState([] as IReminder[]);
  const { chat } = useContext(ControlPanelContext);

  useEffect(() => {
    socket.emit('get reminders', (data: IReminder[]) => {
      setLoading(false);
      setReminders(data);
    });
  }, []);

  const removeReminder = (reminderId: number) => {
    socket.emit(
      'remove reminder',
      {
        chatId: chat.chatid,
        reminderId,
      },
      () => {
        setReminders(reminders.filter(x => x.id !== reminderId));
      }
    );
  };

  const reminderElements = reminders.map(
    ({ id, timestamp, text, askername }, i) => {
      const triggerTime = dateFormat(Number(timestamp), 'dd.mm.yyyy HH:MM');

      return (
        <ReminderItem key={i}>
          <Column>
            <RemoveButton
              className="fas fa-minus-circle"
              onClick={() => removeReminder(Number(id))}
            />
          </Column>
          <Column>
            <TriggerTime>{triggerTime}</TriggerTime>
          </Column>
          <Column>
            <AskerName>{askername}:</AskerName>
          </Column>
          <Column>
            <RemindText>{text}</RemindText>
          </Column>
        </ReminderItem>
      );
    }
  );

  if (loading) {
    return <>Loading...</>;
  }

  if (!reminderElements.length) {
    return <>No reminders.</>;
  }

  return (
    <>
      {reminderElements}
      <ReminderCount>Reminder count: {reminderElements.length}</ReminderCount>
    </>
  );
}
