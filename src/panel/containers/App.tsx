import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import ControlPanel from './ControlPanel';
import Denied from './Denied';

const GlobalStyle = createGlobalStyle`
  @import url('//fonts.googleapis.com/css?family=Rubik&subset=latin');
  @import url('//fonts.googleapis.com/css?family=Space+Mono');
  
  * {
    font-family: 'Rubik', sans-serif;
  }

  body {
    margin: 0;
    background: #dfedf8;
  }
`;

export default function App() {
  return (
    <div>
      <GlobalStyle />

      <BrowserRouter>
        <Switch>
          <Route path="/:chatId" exact={true} component={ControlPanel} />
          <Route
            path="/:chatId/commands/:initialCommand"
            exact={true}
            component={ControlPanel}
          />
          <Route component={Denied} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
