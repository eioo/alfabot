import React from 'react';
import { render } from 'react-dom';
import Panel from './containers/Panel';
import * as serviceWorker from './serviceWorker';

render(<Panel />, document.getElementById('root'));
serviceWorker.unregister();

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
    throw new Error();
  });
}
