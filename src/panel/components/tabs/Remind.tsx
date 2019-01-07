import dateFormat from 'dateformat';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components';
import notificationSound from '../../assets/notification.mp3';

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

const notify = (msg: string) => {
  toast(msg, {
    onOpen: () => {
      const sound = new Audio(notificationSound);
      sound.play();
    },
  });
};

export default function Remind() {
  const { chat } = useContext(ControlPanelContext);
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState([] as IReminder[]);

  useEffect(() => {
    socket.emit('get reminders', (data: IReminder[]) => {
      setLoading(false);
      setReminders(data);

      const nextReminder = reminders[0];

      if (!nextReminder || !nextReminder.id) {
        return;
      }

      removeReminderState(
        nextReminder.id,
        nextReminder.timestamp - +new Date()
      );
    });

    socket.on('new reminder', (reminder: IReminder) => {
      const timeUntil = reminder.timestamp - +new Date();

      setReminders(r => [...r, reminder]);
      removeReminder(reminder, timeUntil);
      notify(`New reminder!\nFrom: ${reminder.askername}`);
    });

    socket.on('reminder removed', (reminder: IReminder) => {
      removeReminderState(reminder);
    });
  }, []);

  const removeReminder = (reminder: IReminder | number, delay: number = 0) => {
    setTimeout(() => {
      const reminderId = typeof reminder === 'number' ? reminder : reminder.id;

      socket.emit(
        'remove reminder',
        {
          id: reminderId,
          chatid: chat.chatid,
        },
        () => {
          setReminders(reminders.filter(x => x.id !== reminderId));
        }
      );
    }, delay);
  };

  const removeReminderState = (
    reminder: IReminder | number,
    delay: number = 0
  ) => {
    const reminderId = typeof reminder === 'number' ? reminder : reminder.id;

    setTimeout(() => {
      setReminders(r => r.filter(x => x.id !== reminderId));
    }, delay);
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