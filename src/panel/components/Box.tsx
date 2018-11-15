import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 20rem;
  border-radius: 4px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
`;

const Legend = styled.div`
  border-radius: 4px 4px 0 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  background: rgba(255, 255, 255);
  padding: 1rem;
`;

const Content = styled.div`
  padding: 1rem;
`;

interface IBoxProps {
  title: string;
  children?: any;
}

export default function Box({ title, children }: IBoxProps) {
  return (
    <Wrapper>
      <Legend>{title}</Legend>
      <Content>{children}</Content>
    </Wrapper>
  );
}
