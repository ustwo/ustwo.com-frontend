import browserify from 'browserify';
import babelify from 'babelify';
import aliasify from 'aliasify';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import omit from 'lodash/object/omit';
import capitalize from 'lodash/string/capitalize';

import helpers from './helpers';
import log from '../app/lib/log';

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

router.get('/sandbox/:component.js', (req, res, next) => {
  const basepath = __dirname;
  const filename = path.join(basepath, '../app/components', req.params.component, 'index.js');
  const sandbox = path.join(basepath, '../app/components', req.params.component, 'sandbox.js');
  const b = browserify();

  let aliasifyConfig = require('../app/aliases.sandbox.json');

  b.transform(babelify.configure({
      optional: ["es7.classProperties"]
  }));
  b.transform(aliasify, aliasifyConfig);

  b.require('react', {expose: 'react'});
  b.require(filename, {expose: 'index'});
  b.require(sandbox, {expose: 'sandbox'});

  res.setHeader('content-type', 'text/javascript');

  // catch file system errors, such as test.js being unreadable
  b.on('error', (error) => {
    console.error('browserify error', error);

    res.send('console.error(\'' + errorMessage + '\');');
  });

  b.bundle()
    .on('error', (error) => {
      console.log("b.bundle() error", error);

      const errorMessage = [error.name, ': "', error.description, '" in ', error.filename, ' at line number ', error.lineNumber].join('');
      // due to Chrome not displaying response data in non 200 states need to expose the error message via a console.error
      res.send('console.error(\'' + errorMessage + '\');');
    })
    .pipe(res);
});

router.get('/sandbox/:component', (req, res) => {
  const slug = req.params.component;
  const uri = `/sandbox/${slug}.js`;

  res.render('component', {
    name: capitalize(slug),
    uri: uri
  });
});

router.get('/sandbox', (req, res) => {
  helpers.getAllComponentSandboxNames(components => {
    res.render('components', {
      components: components
    });
  });
});

router.post('/blog/search', renderApp);
router.get('/*', renderApp);

export default router;
