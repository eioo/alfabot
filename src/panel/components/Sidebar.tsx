import React from 'react';
import styled from 'styled-components';

import { device } from '../theme';
import Navigation from './Navigation';

const SidebarStyles = styled.div`
  min-height: 100vh;
  background: #013c56;
  color: #fff;
  padding: 0 2rem 0 2rem;
  width: 50px;
  padding: 0 1rem;

  @media ${device.tablet} {
    padding: 0 1rem;
    width: unset;
  }
`;

const Title = styled.div`
  font-weight: normal;
  font-size: 2rem;
  white-space: nowrap;
  padding: 0.8rem 0rem;
  user-select: none;
  text-align: center;

  @media ${device.tablet} {
    text-align: left;
  }
`;

const TitleText = styled.span`
  display: none;
  margin-left: 0.5rem;
  font-size: 1.8rem;
  font-family: 'Space Mono', monospace;
  font-weight: bold;
  vertical-align: text-bottom;

  @media ${device.tablet} {
    display: inline-block;
  }
`;

export default function Sidebar() {
  return (
    <SidebarStyles>
      <Title>
        🤖 <TitleText>Alfabot</TitleText>
      </Title>
      <Navigation />
    </SidebarStyles>
  );
}
