import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import ChatSettings from './ChatSettings';
import Denied from './Denied';

const GlobalStyle = createGlobalStyle`
  @import url('//fonts.googleapis.com/css?family=Rubik&subset=latin');

  * {
    font-family: 'Rubik', sans-serif;
  }

  body {
    margin: 0;
  }
`;

export default function App() {
  return (
    <div>
      <GlobalStyle />

      <BrowserRouter>
        <Switch>
          <Route path='/:chatId' exact component={ChatSettings} />
          <Route component={Denied} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
