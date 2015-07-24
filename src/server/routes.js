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
  // const App = React.createFactory(require('../source/app.jsx'));
  readData(data => res.render('index', {
    title: 'ustwo',
    data: data
    // app: React.renderToString(App({
    //   initialUrl: req.protocol + '://' + req.hostname + req.originalUrl
    // }))
  }));
});

export default router;
