import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

render(<App />, rootElement);
registerServiceWorker();
