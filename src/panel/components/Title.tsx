import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Title = () => {
  return (
    <Header as='h2'>
      <Icon name='settings' />
      <Header.Content>Alfabot settings</Header.Content>
    </Header>
  );
};

export default Title;
