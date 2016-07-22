import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch/fetch-npm-node.js';
import pick from 'lodash/object/pick';

import log from 'app/lib/log';
import window from 'app/adaptors/server/window';

(typeof window !== 'undefined') && (window.ajaxPending = false);
let ajaxes = {};

let defaultConfig = require('app/adaptors/server/proxy-url')();

function fetcher (config) {
  const mergedConfig = Object.assign({}, defaultConfig, config);
  const url = mergedConfig.api() + mergedConfig.url;
  log('Fetching:', url);
  const req = fetch(url, mergedConfig)
    .then(response => {
      remove(mergedConfig.url);
      if (response.status >= 400) {
        if(mergedConfig.failure) {
          mergedConfig.failure(response);
        } else {
          throw new Error('Bad response from server');
        }
      }
      return response.json().then(data => {
        return {
          postsPaginationTotal: response.headers.get('X-WP-TotalPages'),
          eventsPaginationTotal: response.headers.get('X-WP-TotalPages'),
          archivedEventsPaginationTotal: response.headers.get('X-WP-TotalPages'),
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
