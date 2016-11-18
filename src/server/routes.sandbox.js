import browserify from 'browserify';
import babelify from 'babelify';
import aliasify from 'aliasify';
import express from 'express';
import path from 'path';
import capitalize from 'lodash/string/capitalize';

import helpers from 'server/helpers';
import log from 'app/lib/log';

const router = express.Router();

router.get('/:component.js', (req, res, next) => {
  const basepath = __dirname;
  const filename = path.join(basepath, '../app/components', req.params.component, 'index.js');
  const sandbox = path.join(basepath, '../app/components', req.params.component, 'sandbox.js');
  const b = browserify();

  let aliasifyConfig = require('app/aliases.sandbox.json');

  b.transform(babelify);
  b.transform(aliasify, aliasifyConfig);

  b.require('react', {expose: 'react'});
  b.require('react-dom', {expose: 'react-dom'});
  b.require(filename, {expose: 'index'});
  b.require(sandbox, {expose: 'sandbox'});

  res.setHeader('content-type', 'text/javascript');

  // catch file system errors, such as test.js being unreadable
  b.on('error', (error) => {
    console.error('browserify error', error);

    res.send(`console.error('${errorMessage}');`);
  });

  b.bundle()
    .on('error', (error) => {
      console.log("b.bundle() error", error);

      const errorMessage = [error.name, ': "', error.description, '" in ', error.filename, ' at line number ', error.lineNumber].join('');
      // due to Chrome not displaying response data in non 200 states need to expose the error message via a console.error
      res.send(`console.error('${errorMessage}');`);
    })
    .pipe(res);
});

router.get('/:component', (req, res) => {
  const slug = req.params.component;
  const uri = `/sandbox/${slug}.js`;

  res.render('component', {
    name: capitalize(slug),
    uri: uri
  });
});

router.get('/', (req, res) => {
  helpers.getAllComponentSandboxNames(components => {
    res.render('components', {
      components: components
    });
  });
});

export default router;
