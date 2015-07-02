'use strict';

import cons from 'consolidate';
// import cookieParser from 'cookie-parser';
// import errorhandler from 'errorhandler';
import express from 'express';
import http from 'http';
// import fs from 'fs';
// import logger from 'morgan';
import path from 'path';
// import session from 'express-session';
// import favicon from 'serve-favicon';
import camelCase from 'lodash/string/camelCase';
import capitalize from 'lodash/string/capitalize';

import manifest from '../package.json';
import routes from './routes.js';

// Internal dependencies
let app = express();
// let srcPath = path.join(__dirname, '../src');
let buildPath = path.join(__dirname, '../public');
let dataPath = path.join(__dirname, '../data');
// let logPath = path.join(__dirname, '../logs');
// let logStream = fs.createWriteStream(
//   path.join(logPath, '/access.log'),
//   {flags: 'w'}
// );
// let logFormat = JSON.stringify({
//   method: ':method',
//   url: ':url',
//   status: ':status',
//   date: ':date[iso]',
//   duration: ':response-time ms',
//   content_length: ':res[content-length]',
//   app_name: camelCase(manifest.name),
//   app_version: manifest.version,
// });

app.set('port', process.env.PORT || 3333);
app.set('host', process.env.VIRTUAL_HOST || ('http://localhost:' + app.get('port') + '/'));
app.set('x-powered-by', false);
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../templates'));

// if (app.get('env') === 'development') {
//   app.use(errorhandler());
// }
// app.use(favicon(path.join(buildPath, 'favicon.png')));
// app.use(logger(logFormat, {stream: logStream}));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(session({
//   secret: 'ustwo_com_website_2_0',
//   saveUninitialized: false,
//   resave: false
// }));

app.use(express.static(buildPath));
app.use(express.static(dataPath));
app.use('/', routes);

http.createServer(app).listen(app.get('port'));
console.log(`${capitalize(camelCase(manifest.name))} ${manifest.version} up and running on ${app.get('port')}`);
