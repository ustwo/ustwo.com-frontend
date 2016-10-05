import RoutePattern from 'route-pattern';
import find from 'lodash/collection/find';
import some from 'lodash/collection/some';
import mapValues from 'lodash/object/mapValues';
import camelCase from 'lodash/string/camelCase';

import {Modernizr} from 'app/adaptors/server/env';
import Track from 'app/adaptors/server/track';
import window from 'app/adaptors/server/window';

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

function applyRoute(page, params, hash, itemsToLoad, statusCode=200) {
  Flux.goTo(page, params, hash, statusCode);
  Flux.loadData([].concat(globalLoads, itemsToLoad));
}

function getHash(vurl) {
  let hash = vurl.hash.substr(1);
  hash = hash.length ? hash : null;
  return hash;
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
    init(initialUrl, hostApi='', proxyUrl) {
      const vurl = virtualUrl(initialUrl || window.location.href);
      global.hostApi = hostApi;
      global.proxyUrl = proxyUrl || vurl.origin;
      window.onpopstate = () => {
        Flux.navigate(window.location.href, true, true);
      };
      Flux.navigate(vurl.original, false, false, true, true);
    },
    navigate(urlString, history, ignoreUrl, replaceState, force) {
      const vurl = virtualUrl(urlString);
      const path = vurl.pathname + vurl.search;
      let route = find(Routes, route => {
        return some(route.patterns, pattern => RoutePattern.fromString(pattern).matches(path));
      });

      let namedParams = [];
      let params = [];

      if (!route) {
        route = Routes.notfound;
      } else {
        const pattern = find(route.patterns, pattern => RoutePattern.fromString(pattern).matches(path));
        let paramsResult = RoutePattern.fromString(pattern).match(path);
        params = paramsResult ? paramsResult.params : [];
        namedParams = paramsResult ? paramsResult.namedParams : [];
      }
      applyRoute(route.id, namedParams, getHash(vurl), route.data.apply(null, params), route.statusCode);

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
        case 'events':
          Flux.setEventsStudioTo(params[0] || 'all');
          break;
      }
      Track('set', 'page', path);
      Track('send', 'pageview');
    },
    override(url) {
      return (e) => {
        var openInNewTab = (e.button === 1 || e.shiftKey || e.ctrlKey || e.metaKey) ? true : false;

        if(!openInNewTab) {
          e.preventDefault();
          Flux.navigate(url);
        }
      };
    },
    overrideNoScroll(url) {
      return (e) => {
        var openInNewTab = (e.button === 1 || e.shiftKey || e.ctrlKey || e.metaKey) ? true : false;

        if(!openInNewTab) {
          e.preventDefault();
          Flux.navigate(url, true);
        }
      };
    }
  }
);

window.Flux = Flux;

export default Flux
