'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import env from 'app/adaptors/server/env';
import App from 'app/components/app';
import Flux from 'app/flux';

window.env = env;

Flux.init();
ReactDOM.render(
  <App state={state} />,
  document.body
);
