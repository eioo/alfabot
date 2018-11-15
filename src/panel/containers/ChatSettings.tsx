import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { IChatSettings } from '../../shared/types/database';
import { getAPIUrl } from '../apiBuilder';
import Box from '../components/Box';
import Navigation from '../components/Navigation';
import Weather from '../components/Weather';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 15vw;
  min-height: 100vh;
  background: #013c56;
  color: #fff;
  padding: 0 2rem;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);

  h3 {
    font-family: 'Space Mono', monospace;
    font-weight: normal;
    font-size: 1.7rem;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 1rem;
`;

export default function ChatSettings({ match }) {
  const { chatId } = match.params;
  const [chat, setChat] = useState({} as IChatSettings);
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
  }, []);

  if (denied) {
    return <Redirect to="/" />;
  }

  if (_.isEmpty(chat)) {
    return <div>Loadings :D</div>;
  }

  return (
    <Wrapper>
      <Sidebar>
        <h3>🤖 Alfabot</h3>

        {/*<Navigation />*/}
      </Sidebar>
      <Content>
        <Box title="/weather">
          <Weather chat={chat} />
        </Box>
      </Content>
    </Wrapper>
  );
}
