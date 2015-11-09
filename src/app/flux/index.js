import RoutePattern from 'route-pattern';
import find from 'lodash/collection/find';
import mapValues from 'lodash/object/mapValues';
import camelCase from 'lodash/string/camelCase';

import {Modernizr} from '../adaptors/server/env';
import Track from '../adaptors/server/track';
import window from '../adaptors/server/window';

import virtualUrl from './virtualurl';
import Routes from './routes';
import Actions from './actions';

const globalLoads = [{
  url: 'ustwo/v1/nav/main',
  type: 'navMain'
}, {
  url: 'ustwo/v1/global/footer',
  type: 'footer'
}, {
  url: 'ustwo/v1/takeovers',
  type: 'takeover',
  get: response => {
    response.data = response.data[0];
    return response;
  }
}, {
  url: 'ustwo/v1/studios?_embed',
  type: 'studios'
}];

function getRouteHandler(name, itemsToLoad, statusCode) {
  Flux.goTo(name, statusCode || 200);
  Flux.loadData([].concat(globalLoads, itemsToLoad));
}

function setUrl(url, replace) {
  if (replace) {
    window.history.replaceState(null, null, url);
  } else {
    window.history.pushState(null, null, url);
  }
}

const Flux = Object.assign(
  Actions,
  {
    init(initialUrl, hostApi, proxyUrl) {
      const vurl = virtualUrl(initialUrl || window.location.href);
      global.hostApi = hostApi || '';
      global.proxyUrl = proxyUrl || vurl.origin;

      window.onpopstate = () => {
        let url = window.location.href;
        if(window.location.href.indexOf('#') > -1) {
          url = window.location.hash.substr(1);
        }
        Flux.navigate(url, true, true);
      };

      if (!RoutePattern.fromString(Routes.home.pattern).matches(vurl.pathname)) {
        Flux.navigate(vurl.original, false, false, true, true);
      } else {
        Track('set', 'page', '/');
        Track('send', 'pageview');
        setUrl(vurl.original, true);
        getRouteHandler(Routes.home.id, Routes.home.data(), Routes.home.statusCode);
      }
    },
    navigate(urlString, history, ignoreUrl, replaceState, force) {
      const vurl = virtualUrl(urlString);
      const path = vurl.pathname + vurl.search;
      let route = find(Routes, route => {
        return RoutePattern.fromString(route.pattern).matches(path);
      });

      if (!route) {
        route = Routes.notfound;
      }
      let paramsSearch = RoutePattern.fromString(route.pattern).match(path);
      let params = paramsSearch ? paramsSearch.params : [];
      getRouteHandler(route.id, route.data.apply(null, params), route.statusCode);

      if (!ignoreUrl) {
        setUrl(urlString, replaceState);
      }
      if (!history) {
        window.scrollTo(0, 0);
      }
      switch(route.id) {
        case 'blog':
          Flux.setBlogCategoryTo(params[0] || 'all');
          break;
        case 'blog/search-results':
          Flux.setSearchQueryTo(params[0]);
          break;
      }
      Track('set', 'page', path);
      Track('send', 'pageview');
    },
    override(url) {
      return (e) => {
        e.preventDefault();
        Flux.navigate(url);
      };
    }
  }
);

window.Flux = Flux;

export default Flux
