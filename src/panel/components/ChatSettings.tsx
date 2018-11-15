import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { IChatSettings } from '../../shared/types/database';
import { getAPIUrl } from '../apiBuilder';
import Weather from './Weather';

const Wrapper = styled.div`
  margin: auto;
  width: 50vw;
  min-width: 360px;
  margin-top: 1em;
`;

const Title = styled.div`
  font-size: 1.5em;
  padding: 0.5em 0em;
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
    return <Redirect to='/' />;
  }

  if (_.isEmpty(chat)) {
    return <div>Loadings :D</div>;
  }

  return (
    <Wrapper>
      <Title>Alfabot</Title>
      <Weather chat={chat} />
    </Wrapper>
  );
}
