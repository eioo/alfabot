import React from 'react';
import { render } from 'react-dom';

import Panel from './containers/Panel';
import html from './index.html';
import * as serviceWorker from './serviceWorker';

document.body.innerHTML = html;
render(<Panel />, document.getElementById('root'));

serviceWorker.unregister();
