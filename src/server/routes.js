import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import omit from 'lodash/object/omit';

import log from '../app/lib/log';

const isomorphic = true;
log('Isomorphic:', isomorphic);
let router = express.Router();

function readData (cb) {
  fs.readFile(path.join(path.join(__dirname), '../data/gulpdata.json'), 'utf8', (err, data) => {
    if (err) {
      return log(err);
    }
    cb(data);
  });
}

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

router.get('/styleguide', (req, res) => {
  readData(data => res.render('styleguide', {
    title: 'ustwo styleguide',
    data: data
  }));
});

router.post('/blog/search', renderApp);
router.get('/*', renderApp);

export default router;
