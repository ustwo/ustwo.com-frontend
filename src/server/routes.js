import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import omit from 'lodash/object/omit';

import log from '../app/lib/log';
import helpers from './helpers';

const isomorphic = true;
log('Isomorphic:', isomorphic);
let router = express.Router();

function renderApp(req, res) {
  if (isomorphic) {
    const Flux = require('../app/flux');
    Flux.init(req.protocol + '://' + req.hostname + req.originalUrl, req.get('Host-API'), `https://${process.env.DOCKER_PROXY_HOST}:${process.env.PROXY_HTTPS_PORT}`)
      .then((state) => {
        const App = React.createFactory(require('../app/components/app'));
        const AppString = React.renderToString(App({
          state: omit(state, 'takeover')
        }));
        const head = Helmet.rewind();
        res
          .status(state.statusCode)
          .render('app', {
            title: head.title,
            meta: head.meta,
            link: head.link,
            state: JSON.stringify(state),
            app: AppString
          });
      })
      .catch(error => log('server route error', error, error.stack));
  } else {
    res
      .render('app', {
        title: '',
        meta: '',
        link: '',
        state: '""',
        app: ''
      });
  }
}

router.get('/components', (req, res) => {
  helpers.getAllComponentSandboxNames(components => {
    res.render('components', {
      components: components
    });
  });
});

router.post('/blog/search', renderApp);
router.get('/*', renderApp);

export default router;
