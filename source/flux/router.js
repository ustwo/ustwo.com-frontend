import RoutePattern from "route-pattern";
import find from 'lodash/collection/find';
import mapValues from 'lodash/object/mapValues';
import camelCase from 'lodash/string/camelCase';
import Modernizr from 'browsernizr';

import manifest from '../../package.json';
import Actions from './actions';
import virtualUrl from './virtualurl';
import routes from './routes.js';

function init (initialUrl) {
  const vurl = virtualUrl(initialUrl || window.location.href);

  window.onpopstate = () => {
    let url = window.location.href;
    if(window.location.href.indexOf('#') > -1) {
      url = window.location.hash.substr(1);
    }
    Router.navigate(url, true);
  };

  if (!RoutePattern.fromString(routes.home.pattern).matches(vurl.pathname)) {
    Router.navigate(vurl.original, false, true, true);
  } else {
    setUrl(vurl.original, true);
    routes.home.handler(vurl.searchObject);
  }
}

function setUrl (url, replace) {
  const vurl = virtualUrl(url);
  const name = manifest.name;
  vurl.href = url;

  console.log('Setting url', url);
  if (replace) {
    window.history.replaceState(null, name, url);
  } else {
    window.history.pushState(null, name, url);
  }
}

function navigate (urlString, ignoreUrl, replaceState, force) {
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
  if(force || Modernizr.history) {
    action.apply(this, params);
  }
}

function notfound (url) {
  console.log('notfound', url);
  Actions.goTo('notfound');
}

const Router = {
  init: init,
  navigate: navigate
};

window.Router = Router;

export default Router;
