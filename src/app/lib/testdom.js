'use strict';

var jsdom = require("jsdom").jsdom;

if (typeof document !== 'undefined') return

// mock browser setup
global.window = jsdom('<html><body><div id="sandbox"></div></body></html>', {}).defaultView;
global.document = window.document;
global.navigator = window.navigator;

// React
global.React = require('react');
global.ReactDOM = require('react-dom');
global.ReactTestUtils = require('react/lib/ReactTestUtils');

// test libs
global.chai = require("chai");
global.sinon = require("sinon");
global.sinonChai = require("sinon-chai");
global.expect = chai.expect;
chai.use(sinonChai);
