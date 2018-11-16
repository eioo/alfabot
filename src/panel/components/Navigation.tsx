import React, { useContext } from 'react';
import styled from 'styled-components';

import { ControlPanelContext } from '../containers/ControlPanel.context';
import routes from '../routes';
import { device } from '../theme';

interface INavLinkProps {
  disabled?: boolean;
  selected?: boolean;
}

const NavLink = styled.a`
  display: block;
  padding: 1rem 0rem;
  color: ${({ selected, disabled }: INavLinkProps) =>
    disabled ? 'gray' : selected ? 'black' : 'white'};
  text-decoration: none;
  letter-spacing: 0.05rem;
  font-size: 0.7rem;
  user-select: none;

  @media ${device.tablet} {
    font-size: 0.9rem;
  }

  ${({ selected }: INavLinkProps) =>
    selected &&
    `
      background: #fff;
      transform: translateX(-1rem);
      width: 100%;
      padding: 1rem;
    `}
`;

export default function Navigation() {
  const { chat, commands, selectedCommand, selectCommand } = useContext(
    ControlPanelContext
  );

  const changeUrl = path => {
    const newUrl = `/${chat.chatid}/${path}`.replace(/\/+$/, '');
    history.pushState(path, 'Alfabot', newUrl);
  };

  if (!(selectedCommand in routes)) {
    selectCommand('weather');
    changeUrl('');
  }

  return (
    <>
      {commands.map(command => {
        if (!(command in routes)) {
          return null;
        }

        const selected = command === selectedCommand;

        return (
          <NavLink
            key={command}
            selected={selected}
            onMouseDown={() => {
              if (selected) {
                return;
              }

              selectCommand(command);
              changeUrl(`commands/${command}`);
            }}
          >
            /{command}
          </NavLink>
        );
      })}
    </>
  );
}
