import React from 'react';
import { hot } from 'react-hot-loader';
import { Container, Segment } from 'semantic-ui-react';
import Settings from './settings';
import Title from './Title';

class App extends React.Component {
  render() {
    return (
      <Container style={{ marginTop: '1em' }}>
        <Segment>
          <Title />
          <Settings />
        </Segment>
      </Container>
    );
  }
}

export default hot(module)(App);
