import { polyfill } from 'es6-promise';
import Fetch from 'isomorphic-fetch/fetch-npm-node.js';
import pick from 'lodash/object/pick';

import Log from '../_lib/log';
import window from '../../server/adaptors/window';

(typeof window !== 'undefined') && (window.ajaxPending = false);
let ajaxes = {};

let defaultConfig = {
  baseurl: require('../../server/adaptors/proxy-url')
}

function fetcher (config) {
  let mergedConfig = Object.assign({}, defaultConfig, config);
  let url;
  if (config.external) {
    switch(config.external) {
      case 'facebook':
        url = mergedConfig.url;
        break;
      case 'twitter':
        url = (mergedConfig.baseurl + mergedConfig.url).replace('/api/wp-json/', '/');
        break;
    }
  } else {
    url = mergedConfig.baseurl + mergedConfig.url;
  }
  Log('Fetching:', url);
  const req = Fetch(url, mergedConfig)
    .then((response) => {
      remove(mergedConfig.url);
      if (response.status >= 400) {
        if(mergedConfig.failure) {
          mergedConfig.failure(response);
        } else {
          throw new Error("Bad response from server");
        }
      }
      return response.json();
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
