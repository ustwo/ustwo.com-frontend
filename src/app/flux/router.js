import RoutePattern from 'route-pattern';
import find from 'lodash/collection/find';
import mapValues from 'lodash/object/mapValues';
import camelCase from 'lodash/string/camelCase';

import {Modernizr} from '../../server/adaptors/env';
import window from '../../server/adaptors/window';

import manifest from '../../../package.json';
import Actions from '../flux/actions';
import virtualUrl from '../flux/virtualurl';
import routes from '../flux/routes.js';

function init (initialUrl, navigator) {
  const vurl = virtualUrl(initialUrl || window.location.href);

  window.onpopstate = () => {
    let url = window.location.href;
    if(window.location.href.indexOf('#') > -1) {
      url = window.location.hash.substr(1);
    }
    navigator(url, true, true);
  };

  if (!RoutePattern.fromString(routes.home.pattern).matches(vurl.pathname)) {
    return navigator(vurl.original, false, false, true, true);
  } else {
    setUrl(vurl.original, true);
    return routes.home.handler(vurl.searchObject);
  }
}

function navigate (urlString, history, ignoreUrl, replaceState, force) {
  const vurl = virtualUrl(urlString);
  const pathname = vurl.pathname;
  let action;
  let params;
  let route = find(routes, (route) => {
    return RoutePattern.fromString(route.pattern).matches(pathname);
  });

  if (route) {
    action = route.handler,
    params = RoutePattern.fromString(route.pattern).match(pathname).params;
    params.push(mapValues(vurl.searchObject, value => camelCase(value)));
  } else {
    action = notfound;
    params = [pathname];
  }
  if (!ignoreUrl) {
    setUrl(urlString, replaceState);
  }
  if(!history) {
    window.document.body.scrollTop = 0;
  }
  return action.apply(this, params);
}

function setUrl (url, replace) {
  const vurl = virtualUrl(url);
  const name = manifest.name;
  vurl.href = url;

  if (replace) {
    window.history.replaceState(null, name, url);
  } else {
    window.history.pushState(null, name, url);
  }
}

function notfound (url) {
  console.log('notfound', url);
  return Actions.goTo('notfound', 404);
}

const Router = {
  init: init,
  navigate: navigate
};

export default Router;
