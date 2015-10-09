import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch/fetch-npm-node.js';
import pick from 'lodash/object/pick';

import Log from './log';
import window from '../adaptors/server/window';

(typeof window !== 'undefined') && (window.ajaxPending = false);
let ajaxes = {};

let defaultConfig = require('../adaptors/server/proxy-url')();

function generateURL(config) {
  let url;
  switch(config.external) {
    case 'facebook':
      url = config.url;
      break;
    case 'twitter':
      url = config.proxy() + config.url;
      break;
    default:
      url = config.api() + config.url;
      break;
  }
  return url;
}

function fetcher (config) {
  const mergedConfig = Object.assign({}, defaultConfig, config);
  const url = generateURL(mergedConfig);
  Log('Fetching:', url);
  const req = fetch(url, mergedConfig)
    .then(response => {
      remove(mergedConfig.url);
      if (response.status >= 400) {
        if(mergedConfig.failure) {
          mergedConfig.failure(response);
        } else {
          throw new Error("Bad response from server");
        }
      }
      return response.json().then(data => {
        return {
          postsPaginationTotal: response.headers.get('X-WP-TotalPages'),
          data: data
        }
      });
    });
  if(mergedConfig.success) {
    req
      .then(mergedConfig.success)
      .catch(mergedConfig.failure);
  }
  add(mergedConfig.url, req);
  return req;
}

function add (url, req) {
  ajaxes[url] = req;
  window.ajaxPending = true;
}

function remove (url) {
  delete ajaxes[url];
  window.ajaxPending = !!Object.keys(ajaxes).length;
}

export default fetcher;
