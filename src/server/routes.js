import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import omit from 'lodash/object/omit';

const isomorphic = true;
let router = express.Router();

function readData (cb) {
  fs.readFile(path.join(path.join(__dirname), '../data/gulpdata.json'), 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    cb(data);
  });
}

function renderApp(req, res) {
  if (isomorphic) {
    const Flux = require('../app/flux');
    Flux.init(req.protocol + '://' + req.hostname + req.originalUrl)
      .then((state) => {
        const App = React.createFactory(require('../app/app'));
        const AppString = React.renderToString(App({
          state: omit(state, 'takeover')
        }));
        const head = Helmet.rewind();
        res.status(state.statusCode).render('index', {
          title: head.title,
          meta: head.meta,
          link: head.link,
          state: JSON.stringify(state),
          app: AppString
        });
      })
      .catch(error => console.log('server route error', error, error.stack));
  } else {
    res.render('index', {
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
