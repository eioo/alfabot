import React from 'react';
import styled from 'styled-components';

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default function Denied() {
  return <Centered>Nothing to see here!</Centered>;
}
