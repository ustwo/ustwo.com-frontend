'use strict';

import React from 'react';

import Env from '../server/adaptors/env';
import App from './app';

window.env = Env;

React.initializeTouchEvents(true);

Flux.init(window.location.href).then(state => {
  React.render(
    <App state={state} />,
    document.body
  );
});
