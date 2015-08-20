import {EventEmitter} from 'events';
import RoutePattern from 'route-pattern';
import find from 'lodash/collection/find';
import mapValues from 'lodash/object/mapValues';
import camelCase from 'lodash/string/camelCase';

import {Modernizr} from '../../server/adaptors/env';
import Track from '../../server/adaptors/track';
import window from '../../server/adaptors/window';

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
  url: 'ustwo/v1/takeovers?embed',
  type: 'takeover',
  get: data => data[0]
}, {
  url: 'ustwo/v1/studios',
  type: 'studios'
}];

function emitify(fn) {
  return function() {
    return fn.apply(null, arguments).then(state => {
      Flux.emit('change', state);
      return Promise.resolve(state);
    });
  };
}

function getRouteHandler(name, itemsToLoad, statusCode) {
  return Promise.all([
    Flux.goTo(name, statusCode || 200),
    Flux.loadData([].concat(globalLoads, itemsToLoad))
  ]).then(responses => {
    return responses[1];
  });
}

function setUrl(url, replace) {
  if (replace) {
    window.history.replaceState(null, null, url);
  } else {
    window.history.pushState(null, null, url);
  }
}

const Flux = Object.assign(
  EventEmitter.prototype,
  mapValues(Actions, emitify),
  {
    init(initialUrl) {
      const vurl = virtualUrl(initialUrl || window.location.href);

      window.onpopstate = () => {
        let url = window.location.href;
        if(window.location.href.indexOf('#') > -1) {
          url = window.location.hash.substr(1);
        }
        Flux.navigate(url, true, true);
      };

      if (!RoutePattern.fromString(Routes.home.pattern).matches(vurl.pathname)) {
        return Flux.navigate(vurl.original, false, false, true, true);
      } else {
        Track('set', 'page', '/');
        Track('send', 'pageview');
        setUrl(vurl.original, true);
        return getRouteHandler(Routes.home.id, Routes.home.data(), Routes.home.statusCode);
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
      let action = getRouteHandler(route.id, route.data.apply(null, params), route.statusCode);

      if (!ignoreUrl) {
        setUrl(urlString, replaceState);
      }
      if (!history) {
        window.document.body.scrollTop = 0;
      }
      if (params.length) {
        switch(route.id) {
          case 'blog/category':
            Flux.setBlogCategoryTo(params[0]);
            break;
          case 'blog/search-results':
            Flux.setSearchQueryTo(params[0]);
            break;
        }
      }
      Track('set', 'page', path);
      Track('send', 'pageview');
      return action.then(state => {
        Flux.emit('change', state);
        return Promise.resolve(state);
      });
    },
    addChangeListener(callback) {
      Flux.on('change', callback);
    },
    removeChangeListener(callback) {
      Flux.removeListener('change', callback);
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
