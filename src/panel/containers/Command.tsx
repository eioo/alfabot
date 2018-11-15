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

const commandComponents = {
  weather: Weather,
};

export default function Command({ match }) {
  const { command } = match.params;
  const [commands, setCommands] = useState([] as string[]);

  useEffect(() => {
    fetch(getAPIUrl(`commands`))
      .then(response => response.json())
      .then(data => {
        setCommands(data);
      });
  }, []);

  const SelectedCommand =
    commandComponents[command] || commandComponents.weather;

  return (
    <Wrapper>
      <Sidebar>
        <h3>🤖 Alfabot</h3>

        <Navigation currentCommand={command} commands={commands} />
      </Sidebar>
      <Content>
        <Box title={command}>
          <SelectedCommand />
        </Box>
      </Content>
    </Wrapper>
  );
}
