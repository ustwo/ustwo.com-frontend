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
import fetchSocialMediaData from 'app/lib/social-media-fetcher';

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

function bootstrapper(initialUrl, hostApi, proxyUrl) {
  const _state = {
    relatedContent: []
  };
  const vurl = virtualUrl(initialUrl);
  global.hostApi = hostApi;
  global.proxyUrl = proxyUrl;

  if (!RoutePattern.fromString(Routes.home.pattern).matches(vurl.pathname)) {
    return navigate(vurl.original);
  } else {
    return applyRoute(Routes.home.id, Routes.home.data(), Routes.home.statusCode);
  }
  function navigate(urlString) {
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
    let action = applyRoute(route.id, route.data.apply(null, params), route.statusCode);

    switch(route.id) {
      case 'blog':
        setBlogCategoryTo(params[0] || 'all');
        break;
      case 'blog/search-results':
        setSearchQueryTo(params[0]);
        break;
    }
    return action.then(state => Promise.resolve(state));
  }
  function applyRoute(name, itemsToLoad, statusCode) {
    return Promise.all([
      setPage(name, statusCode || 200),
      loadData([].concat(globalLoads, itemsToLoad))
    ]).then(responses => responses[1]);
  }
  function applyData(response, type) {
    const changeSet = {};
    changeSet[type] = response.data;
    if (response.postsPaginationTotal) {
      changeSet.postsPaginationTotal = parseInt(response.postsPaginationTotal, 10);
    }
    Object.assign(_state, changeSet);
    log('Loaded', type, _state[type]);
  }
  function applySocialMediaDataForPosts(response, type) {
    const index = findIndex(_state.posts, 'slug', response.slug);
    if (index > -1) {
      _state.posts[index][type] = response.data;
      log(`Added ${type}`, response.data);
    }
  }
  function setPage(newPage, statusCode) {
    _state.currentPage = newPage;
    _state.statusCode = statusCode;
    return Promise.resolve(_state);
  }
  function loadData(itemsToLoad) {
    return DataLoader(itemsToLoad, applyData).then(() => {
      let result;
      if(some(itemsToLoad, item => item.type === 'posts')) {
        result = getSocialSharesForPosts();
      } else if(some(itemsToLoad, item => item.type === 'post')) {
        result = getSocialSharesForPost();
      } else {
        result = _state;
      }
      return result;
    });
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
  function getSocialSharesForPost() {
    const hasFacebookData = !!_state.facebookShares || _state.facebookShares === 0;
    const hasTwitterData = !!_state.twitterShares || _state.twitterShares === 0;
    let promise;
    if (hasFacebookData && hasTwitterData) {
      promise = Promise.resolve(_state);
    } else {
      promise = fetchSocialMediaData(_state.post.slug, applyData).then(() => _state);
    }
    return promise;
  }
  function getSocialSharesForPosts() {
    return Promise.all(_state.posts.map(post => {
      const hasFacebookData = !!post.facebookShares || post.facebookShares === 0;
      const hasTwitterData = !!post.twitterShares || post.twitterShares === 0;
      let promise;
      if (hasFacebookData && hasTwitterData) {
        promise = Promise.resolve(_state);
      } else {
        promise = fetchSocialMediaData(post.slug, applySocialMediaDataForPosts).then(() => _state);
      }
      return promise;
    })).then(() => _state);
  }
}

export default bootstrapper;
