import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IChat } from '../../shared/types/database';

const API_PORT = process.env.WEBSERVER_PORT || 3000;
const API_BASE = `${location.protocol}//${location.hostname}:${API_PORT}/api`;

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
  const [chat, setChat] = useState({} as IChat);

  useEffect(() => {
    console.log(`Chat ID: ${chatId}`);

    fetch(`http://localhost:3000/api/chatsettings/${chatId}`)
      .then(response => response.json())
      .then(data => {
        setChat(data);
      });
  }, []);

  useEffect(
    () => {
      if (!Object.keys(chat).length) {
        return;
      }

      console.log(chat);
    },
    [chat]
  );

  return (
    <Wrapper>
      <Title>Alfabot</Title>
      Content
    </Wrapper>
  );
}
