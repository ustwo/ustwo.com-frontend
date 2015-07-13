'use strict';

import cons from 'consolidate';
import express from 'express';
import http from 'http';
import path from 'path';
import camelCase from 'lodash/string/camelCase';
import capitalize from 'lodash/string/capitalize';

import manifest from '../../package.json';
import routes from './routes.js';

let app = express();
let publicPath = path.join(__dirname, '../../public');
let dataPath = path.join(__dirname, '../data');

app.set('port', process.env.PORT || 8888);
app.set('host', process.env.VIRTUAL_HOST || ('http://localhost:' + app.get('port') + '/'));
app.set('x-powered-by', false);
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../templates'));

app.use(express.static(publicPath));
app.use(express.static(dataPath));
app.use('/', routes);

http.createServer(app).listen(app.get('port'));
console.log(`${capitalize(camelCase(manifest.name))} ${manifest.version} up and running on ${app.get('port')}`);
