import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { IChatSettings } from '../../shared/types/database';
import Box from '../components/Box';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import routes from '../routes';
import { getCommands, getSettings } from '../services/api';
import { FillPage } from '../theme';
import { ControlPanelContext } from './ControlPanel.context';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  padding: 1rem;
`;

export default function ControlPanel({ match }) {
  const { chatId, initialCommand } = match.params;

  const [chat, setChat] = useState({} as IChatSettings);
  const [commands, setCommands] = useState([] as string[]);
  const [selectedCommand, selectCommand] = useState(
    initialCommand || 'weather'
  );
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    getSettings(chatId).then(response => {
      if (_.isEmpty(response)) {
        setDenied(true);
        return;
      }

      setChat(response);
    });

    getCommands().then(response => setCommands(response));
  }, []);

  if (denied) {
    return <Redirect to="/" />;
  }

  if (_.isEmpty(chat) || _.isEmpty(commands)) {
    return (
      <FillPage>
        <Spinner />
      </FillPage>
    );
  }

  const SettingsComponent = routes[selectedCommand];

  return (
    <ControlPanelContext.Provider
      value={{
        chat,
        setChat,
        selectCommand,
        selectedCommand,
        commands,
      }}
    >
      <Wrapper>
        <Sidebar />
        <Content>
          <Box title={selectedCommand}>
            <SettingsComponent />
          </Box>
        </Content>
      </Wrapper>
    </ControlPanelContext.Provider>
  );
}
