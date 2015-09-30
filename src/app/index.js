'use strict';

import React from 'react';

import Env from './adaptors/server/env';
import App from './components/app';
import Flux from './flux';

window.env = Env;

React.initializeTouchEvents(true);

Flux.init(window.location.href).then(state => {
  React.render(
    <App state={state} />,
    document.body
  );
});
