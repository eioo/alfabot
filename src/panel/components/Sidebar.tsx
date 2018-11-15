import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const SidebarStyles = styled.div`
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

const Title = styled.div`
  font-size: 2vw;
  padding: 1.5rem 0rem;
  user-select: none;
`;

export default function Sidebar() {
  return <SidebarStyles>
    <Title>🤖 Alfabot</Title>

    <Navigation />
  </SidebarStyles>
}
