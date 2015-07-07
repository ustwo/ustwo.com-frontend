import express from 'express';
import React from 'react';

let router = express.Router();

router.get('/*', (req, res) => {
  // const App = React.createFactory(require('../source/app.jsx'));
  res.render('index', {
    title: "ustwo",
    // app: React.renderToString(App({
    //   initialUrl: req.protocol + '://' + req.hostname + req.originalUrl
    // }))
  });
});

export default router;
