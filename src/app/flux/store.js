import {EventEmitter} from 'events';
import filter from 'lodash/collection/filter';
import findIndex from 'lodash/array/findIndex';
import find from 'lodash/collection/find';
import some from 'lodash/collection/some';
import capitalize from 'lodash/string/capitalize';

import log from '../lib/log';
import window from '../adaptors/server/window';
import DataLoader from '../adaptors/server/data-loader';
import Nulls from './nulls';
import Defaults from './defaults';
import fetchSocialMediaData from '../lib/social-media-fetcher';

const _state = Object.assign({
  currentPage: Nulls.page,
  blogCategory: Defaults.blogCategory,
  searchMode: Defaults.searchMode,
  searchQuery: Nulls.searchQuery,
  modal: Nulls.modal,
  colours: Nulls.colours,
  takeover: Nulls.takeover,
  twitterShares: Nulls.twitterShares,
  facebookShares: Nulls.facebookShares,
  postsPagination: Defaults.postsPagination,
  postsPaginationTotal: Nulls.postsPaginationTotal,
  relatedContent: []
}, window.state);
if(_state.takeover && window.localStorage.getItem('takeover-'+_state.takeover.id)) {
  _state.takeover.seen = true;
}

function applyData(response, type) {
  const changeSet = {};
  changeSet[type] = response.data;
  if (response.postsPaginationTotal) {
    changeSet.postsPaginationTotal = parseInt(response.postsPaginationTotal, 10);
  }
  Object.assign(_state, changeSet);
  log('Loaded', type, _state[type]);
  Store.emit('change', _state);
}
function applyJobDetailData(response) {
  const job = response.data;
  const index = findIndex(_state.jobs, 'shortcode', job.shortcode);
  _state.jobs[index] = job;
  log('Added job details', job);
  Store.emit('change', _state);
}
function applyMorePosts(response, type) {
  _state.posts = _state.posts.concat(response.data);
  log('Added more posts', response.data);
  Store.emit('change', _state);
}
function applySocialMediaDataForPosts(response, type) {
  const index = findIndex(_state.posts, 'slug', response.slug);
  if (index > -1) {
    _state.posts[index][type] = response.data;
    log(`Added ${type}`, response.data);
    Store.emit('change', _state);
  }
}
function applyRelatedContent(response) {
  _state.relatedContent.push(response.data);
  log('Loaded related content', response.data);
  Store.emit('change', _state);
}

window._state = _state;

const Store = Object.assign(
  EventEmitter.prototype,
  {
    setPage(newPage, statusCode) {
      const newPageIdArray = newPage.split('/');
      const slug = newPageIdArray[newPageIdArray.length - 1];
      if(_state.page && _state.page.slug !== slug) {
        _state.page = null;
      }
      if(_state.post && _state.post.slug !== slug) {
        _state.post = null;
      }
      if(_state.caseStudy && _state.caseStudy.slug !== slug) {
        _state.caseStudy = null;
      }
      if(newPage !== 'blog/search-results') {
        _state.searchQuery = null;
      }
      if(newPage !== 'blog/post') {
        _state.twitterShares = Nulls.twitterShares;
        _state.facebookShares = Nulls.facebookShares;
      }
      if(newPage !== 'blog') {
        _state.blogCategory = Defaults.blogCategory;
        _state.searchMode = Defaults.searchMode;
        _state.posts = Nulls.posts;
        _state.postsPagination = Defaults.postsPagination;
        _state.postsPaginationTotal = Nulls.postsPaginationTotal;
      }
      _state.currentPage = newPage;
      _state.statusCode = statusCode;
      _state.modal = null;
      _state.relatedContent = [];
      Store.emit('change', _state);
    },
    loadData(itemsToLoad) {
      itemsToLoad = filter(itemsToLoad, item => {
        // load this item if:
        // - it doesn't exist in the store OR
        // - it exists in the store with a different slug OR
        // - posts have a different blog category
        return (!_state[item.type] || (item.slug && _state[item.type].slug && _state[item.type].slug !== item.slug) || (item.slug && item.slug.match(/posts\/\w+/) && item.slug.split('/')[1] !== _state.blogCategory));
      });

      return DataLoader(itemsToLoad, applyData).then(() => {
        switch(true) {
          case some(itemsToLoad, item => item.type === 'posts'):
            Store.getSocialSharesForPosts();
          break;
          case some(itemsToLoad, item => item.type === 'post'):
            Store.getSocialSharesForPost();
          break;
        }
        itemsToLoad.forEach(item => {
          (item.async || []).forEach(dependency => {
            switch(dependency) {
              case 'related_content':
                DataLoader(_state[item.type].related_content.map(url => {
                  return {
                    url: url,
                    type: 'relatedContent'
                  };
                }), applyRelatedContent);
              break;
            }
          });
        });
        Store.emit('change', _state);
      });
    },
    setBlogCategoryTo(id) {
      _state.blogCategory = id;
      _state.postsPagination = Defaults.postsPagination;
      Store.emit('change', _state);
    },
    setSearchQueryTo(string) {
      _state.searchQuery = string;
      Store.emit('change', _state);
    },
    showContacts() {
      _state.modal = 'contacts';
      Store.emit('change', _state);
    },
    showNavOverlay() {
      _state.modal = 'navigation';
      Store.emit('change', _state);
    },
    closeTakeover() {
      if(_state.takeover) {
        try {
          window.localStorage.setItem('takeover-'+_state.takeover.id, true);
        } catch (e) {
          console.warn('Silently ignoring localStorage error when browsing in Private Mode on iOS');
        }
        _state.takeover.seen = true;
      }
      Store.emit('change', _state);
    },
    closeModal() {
      _state.modal = Nulls.modal;
      Store.emit('change', _state);
    },
    getJobDetails(jid) {
      const job = find(_state.jobs, 'shortcode', jid);
      if(job.description) {
        Store.emit('change', _state);
      } else {
        DataLoader([{
          url: `ustwo/v1/jobs/${jid}`,
          type: 'job'
        }], applyJobDetailData).then(() => Store.emit('change', _state));
      }
    },
    showSearch() {
      _state.searchMode = true;
      Store.emit('change', _state);
    },
    hideSearch() {
      _state.searchMode = false;
      Store.emit('change', _state);
    },
    showBlogCategories() {
      _state.modal = 'blogCategories';
      Store.emit('change', _state);
    },
    getSocialSharesForPost() {
      const hasFacebookData = !!_state.facebookShares || _state.facebookShares === 0;
      const hasTwitterData = !!_state.twitterShares || _state.twitterShares === 0;
      if (hasFacebookData && hasTwitterData) {
        Store.emit('change', _state);
      } else {
        fetchSocialMediaData(_state.post.slug, applyData)
          .then(() => Store.emit('change', _state));
      }
    },
    getSocialSharesForPosts() {
      return Promise.all(_state.posts.map(post => {
        const hasFacebookData = !!post.facebookShares || post.facebookShares === 0;
        const hasTwitterData = !!post.twitterShares || post.twitterShares === 0;
        let promise;
        if (hasFacebookData && hasTwitterData) {
          promise = Promise.resolve();
        } else {
          promise = fetchSocialMediaData(post.slug, applySocialMediaDataForPosts);
        }
        return promise;
      })).then(() => Store.emit('change', _state));
    },
    loadMorePosts() {
      if (_state.postsPagination === _state.postsPaginationTotal) {
        Store.emit('change', _state);
      } else {
        const pageNo = ++_state.postsPagination;
        const category = _state.blogCategory;
        let url;
        if (category === 'all') {
          url = `ustwo/v1/posts?per_page=13&page=${pageNo}`;
        } else {
          url = `ustwo/v1/posts?per_page=12&category=${category}&page=${pageNo}`;
        }
        DataLoader([{
          url: url,
          type: 'posts'
        }], applyMorePosts).then(() => Store.emit('change', _state));
      }
    },
    resetPosts() {
      _state.posts = Nulls.posts;
      Store.emit('change', _state);
    }
  }
);

export default Store;
