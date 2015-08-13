import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';

let router = express.Router();

function readData (cb) {
  fs.readFile(path.join(path.join(__dirname), '../data/gulpdata.json'), 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    cb(data);
  });
}

router.get('/styleguide', (req, res) => {
  readData(data => res.render('styleguide', {
    title: 'ustwo styleguide',
    data: data
  }));
});

router.get('/*', (req, res) => {
  readData(data => {
    const Flux = require('../app/flux');
    Flux.init(req.protocol + '://' + req.hostname + req.originalUrl)
      .then((state) => {
        const App = React.createFactory(require('../app/app'));
        res.render('index', {
          title: 'ustwo',
          state: JSON.stringify(state),
          app: React.renderToString(App({
            state: state
          }))
        });
      })
      .catch(error => console.log('server route error', error, error.stack));
  });
});

export default router;
