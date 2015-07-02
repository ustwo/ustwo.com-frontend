import express from 'express';

let router = express.Router();

router.get('/*', (req, res) => {
  // const App = React.createFactory(require('../src/components/app/view.jsx'));
  res.render('index', {
    title: "ustwo",
    // app: React.renderToString(App({
    //   initialUrl: req.protocol + '://' + req.hostname + req.originalUrl,
    //   data: JSON.parse(data)
    // }))
  });
});

export default router;
