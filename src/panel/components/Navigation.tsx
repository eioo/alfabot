import React, { useContext } from 'react';
import styled from 'styled-components';
import { ControlPanelContext } from '../containers/ControlPanel.context';
import Weather from './Weather';

const commandsWithSettings = {
  weather: Weather,
};

interface INavLinkProps {
  disabled?: boolean;
  selected?: boolean;
}

const NavLink = styled.a`
  display: block;
  color: ${
    ({ selected, disabled }: INavLinkProps) =>
      disabled ? 'gray' : (selected ? 'black' : 'white')
  };
  text-decoration: none;
  letter-spacing: 0.05rem;
  padding: 1rem 0;
  font-size: 0.9rem;
  user-select: none;

  ${
    ({ selected }: INavLinkProps) => selected &&
    `
      background: #fff;
      transform: translateX(-2rem);
      width: 100%;
      padding: 1rem 2rem;
    `
  }
`;

export default function Navigation() {
  const { chat, commands, selectedCommand, selectCommand} = useContext(ControlPanelContext);
  
  const changeUrl = (path) => {
    const newUrl = `/${chat.chatid}/${path}`.replace(/\/+$/, '');
    history.pushState(path, 'Alfabot', newUrl);
  };

  if (!commands.includes(selectedCommand)) {
    selectCommand('weather');
    changeUrl('');
  }

  return (
    <>
      {commands.map(command => {
        if (!(command in commandsWithSettings)) {
          return;
        }

        return (
          <NavLink
            key={command}
            selected={command === selectedCommand}
            onMouseDown={() => {
              selectCommand(command);
              changeUrl(`commands/${command}`);
            }}
          >
            /{command}
          </NavLink>
      )}
      )}
    </>
  );
}
