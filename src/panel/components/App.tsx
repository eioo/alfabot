import React from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';
import Settings from './settings';
import Title from './Title';

class App extends React.Component {
  render() {
    return (
      <Container style={{ marginTop: '1em' }}>
        <Segment padded>
          <Title />
          <Settings />
        </Segment>
      </Container>
    );
  }
}

export default App;
