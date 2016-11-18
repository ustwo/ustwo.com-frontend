import browserify from 'browserify';
import babelify from 'babelify';
import aliasify from 'aliasify';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import omit from 'lodash/object/omit';

import log from 'app/lib/log';
import bootstrapper from 'server/bootstrapper';

const isomorphic = true;
log('Isomorphic:', isomorphic);
let router = express.Router();

function renderApp(req, res) {
  if (isomorphic) {
    bootstrapper(`${req.protocol}://${req.hostname}${req.originalUrl}`, req.get('Host-API'), `http://${process.env.DOCKER_PROXY_HOST}`)
      .then((state) => {
        const App = React.createFactory(require('app/components/app'));
        console.log('Rendering HTML to string...');
        const AppString = ReactDOMServer.renderToString(App({
          state: omit(state, 'takeover')
        }));
        console.log('Done');
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

router.post('/blog/search', renderApp);
router.get('/*', renderApp);

export default router;
