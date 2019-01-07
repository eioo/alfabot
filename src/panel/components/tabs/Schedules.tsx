import * as _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import { ISocketResponse } from 'shared/types/sockets';
import styled from 'styled-components';
import { IScheduleData } from 'webserver/controllers/schedules';
import { schedules } from '../../../bot/schedules/rules';
import { ControlPanelContext } from '../../containers/ControlPanel.context';
import { socket } from '../../services/sockets';

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScheduleItem = styled.span`
  padding-bottom: 1rem;
`;

const ScheduleSwitch = styled(Switch)`
  margin-right: 15px;
  vertical-align: middle;
`;

export default function Schedules() {
  const { chat, setChat } = useContext(ControlPanelContext);
  const [switchStates, setSwitchStates] = useState(
    _.zipObject(
      schedules.map(s => s.name),
      schedules.map(s => chat.schedules.enabled.includes(s.name))
    )
  );

  useEffect(() => {
    socket.on(
      'schedule state changed',
      ({ newState, scheduleName }: IScheduleData) => {
        const newEnabled = (() => {
          const { enabled } = chat.schedules;
          const exists = enabled.includes(scheduleName);

          if ((newState && exists) || (!newState && !exists)) {
            return enabled;
          }

          return newState
            ? [...enabled, scheduleName]
            : enabled.filter(x => x !== scheduleName);
        })();

        chat.schedules.enabled = newEnabled;
        switchStates[scheduleName] = newState;
        setChat(chat);
        setSwitchStates(switchStates);
      }
    );
  }, []);

  const listSchedules = () => {
    return schedules.map(schedule => {
      const handleChange = (newState: boolean) => {
        const data: IScheduleData = {
          chatId: chat.chatid,
          scheduleName: schedule.name,
          newState,
        };

        switchStates[schedule.name] = newState;
        setSwitchStates(switchStates);

        socket.emit(
          'set schedule state',
          data,
          ({ error }: ISocketResponse) => {
            if (error) {
              toast.error(error);
              return;
            }
          }
        );
      };

      return (
        <ScheduleItem key={schedule.name}>
          <ScheduleSwitch
            onChange={handleChange}
            checked={switchStates[schedule.name] || false}
          />
          <label>{schedule.name}</label>
        </ScheduleItem>
      );
    });
  };

  return <ScheduleList>{listSchedules()}</ScheduleList>;
}
