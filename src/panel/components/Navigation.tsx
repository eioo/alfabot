import React from 'react';
import styled from 'styled-components';

interface INavLinkProps {
  selected?: boolean;
}

const NavLink = styled.a`
  display: block;
  color: ${(p: INavLinkProps) => (p.selected ? 'black' : 'white')};
  text-decoration: none;
  letter-spacing: 0.05rem;
  padding: 1rem 0;
  font-size: 0.9rem;

  ${(p: INavLinkProps) =>
    p.selected &&
    `
  
  background: #fff;
  transform: translateX(-2rem);
  width: 100%;
  padding: 1rem 2rem;
  `}
`;

interface INavigationProps {
  currentCommand: string;
  commands: string[];
}

export default function Navigation(props: INavigationProps) {
  return (
    <>
      {props.commands.map(command => (
        <NavLink
          href={`/command/${command}`}
          selected={command === props.currentCommand}
        >
          /{command}
        </NavLink>
      ))}
    </>
  );
}
