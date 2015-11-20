'use strict';

import React from 'react';

import env from './adaptors/server/env';
import App from './components/app';
import Flux from './flux';

window.env = env;

React.initializeTouchEvents(true);

Flux.init();
React.render(
  <App state={state} />,
  document.body
);
