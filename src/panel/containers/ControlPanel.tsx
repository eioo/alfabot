import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { IChatSettings } from '../../shared/types/database';
import { getAPIUrl } from '../shared/apiBuilder';

import Box from '../components/Box';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { settingsList } from '../shared/settingsList';
import { FillPage } from '../styled';
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
    fetch(getAPIUrl(`chatsettings/${chatId}`))
      .then(response => response.json())
      .then(data => {
        if (_.isEmpty(data)) {
          return setDenied(true);
        }

        setChat(data);
      });

    fetch(getAPIUrl(`commands`))
      .then(response => response.json())
      .then(data => setCommands(data));
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

  const SettingsComponent = settingsList[selectedCommand];

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
