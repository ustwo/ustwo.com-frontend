'use strict';

import React from 'react';

import Env from '../server/adaptors/env';
import App from './app';

window.env = Env;

React.initializeTouchEvents(true);

React.render(
  <App data={data} />,
  document.body
);
