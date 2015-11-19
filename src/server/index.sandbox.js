'use strict';

import cons from 'consolidate';
import express from 'express';
import http from 'http';
import path from 'path';
import camelCase from 'lodash/string/camelCase';
import capitalize from 'lodash/string/capitalize';

import manifest from '../../package.json';
import sandboxRoutes from 'server/routes.sandbox.js';

let app = express();

app.set('port', 8889);
app.set('host', process.env.VIRTUAL_HOST || ('http://localhost:' + app.get('port') + '/'));
app.set('x-powered-by', false);
app.engine('html', cons.lodash);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './'));

app.use('/sandbox', sandboxRoutes);

http.createServer(app).listen(app.get('port'));
console.log(`${capitalize(camelCase(manifest.name))} up and running on ${app.get('port')}`);
