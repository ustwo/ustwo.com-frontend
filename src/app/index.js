'use strict';

import React from 'react';

import env from 'app/adaptors/server/env';
import App from 'app/components/app';
import Flux from 'app/flux';

window.env = env;

React.initializeTouchEvents(true);

Flux.init();
React.render(
  <App state={state} />,
  document.body
);
