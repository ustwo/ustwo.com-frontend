import filter from 'lodash/collection/filter';
import findIndex from 'lodash/array/findIndex';
import find from 'lodash/collection/find';
import some from 'lodash/collection/some';
import capitalize from 'lodash/string/capitalize';

import log from 'app/lib/log';
import window from 'app/adaptors/server/window';
import DataLoader from 'server/data-loader';
import Nulls from 'app/flux/nulls';
import Defaults from 'app/flux/defaults';

import RoutePattern from 'route-pattern';
import virtualUrl from 'app/flux/virtualurl';
import Routes from 'app/flux/routes';
import Actions from 'app/flux/actions';

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
let _state;

function navigate(urlString) {
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

    switch(route.id) {
      case 'blog':
        setBlogCategoryTo(params[0] || 'all');
        break;
      case 'blog/search-results':
        setSearchQueryTo(params[0]);
        break;
      case 'events':
        setEventsStudioTo(params[0] || 'all');
        break;
    }
  }

  let action = applyRoute(route.id, namedParams, '', route.data.apply(null, params), route.statusCode);
  return action.then(state => Promise.resolve(state));
}
function applyRoute(page, params, hash, itemsToLoad, statusCode) {
  return Promise.all([
    setPage(page, params, hash, statusCode || 200),
    loadData([].concat(globalLoads, itemsToLoad))
  ]).then(responses => responses[1]);
}
function applyData(response, type) {
  const changeSet = {};
  changeSet[type] = response.data;
  if (response.postsPaginationTotal) {
    changeSet.postsPaginationTotal = parseInt(response.postsPaginationTotal, 10);
    if(type === 'events') {
      changeSet.eventsPaginationTotal = parseInt(response.postsPaginationTotal, 10);
    }
    if(type === 'archivedEvents') {
      changeSet.archivedEventsPaginationTotal = parseInt(response.postsPaginationTotal, 10);
    }
  }
  Object.assign(_state, changeSet);
  log('Loaded', type, _state[type]);
}
function setPage(newPage, newParams, newHash, statusCode) {
  _state.currentPage = newPage;
  _state.currentParams = newParams;
  _state.currentHash = newHash;
  _state.statusCode = statusCode;
  return Promise.resolve(_state);
}
function loadData(itemsToLoad) {
  return DataLoader(itemsToLoad, applyData).then(() => _state);
}
function setBlogCategoryTo(id) {
  _state.blogCategory = id;
  _state.postsPagination = Defaults.postsPagination;
  return Promise.resolve(_state);
}
function setSearchQueryTo(string) {
  _state.searchQuery = string;
  return Promise.resolve(_state);
}
function setEventsStudioTo(id) {
  _state.eventsStudio = id;
  _state.eventsPagination = Defaults.eventsPagination;
  return Promise.resolve(_state);
}
function bootstrapper(initialUrl, hostApi, proxyUrl) {
  _state = {
    relatedContent: []
  };
  const vurl = virtualUrl(initialUrl);
  global.hostApi = hostApi;
  global.proxyUrl = proxyUrl;
  return navigate(vurl.original);
}

export default bootstrapper;
