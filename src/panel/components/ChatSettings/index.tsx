import React, { createContext, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { API_BASE } from '../App';

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

  useEffect(() => {
    console.log(`Chat ID: ${chatId}`);

    /* (async () => {
      const endPoint = `${API_BASE}/chatsettings/${chatId}`;
      const response = await fetch(endPoint);
      const json = await response.json();
      console.log(json);
    })(); */
  });

  return (
    <Wrapper>
      <Title>Alfabot</Title>
      Content
    </Wrapper>
  );
}
