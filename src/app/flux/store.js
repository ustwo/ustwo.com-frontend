import reject from 'lodash/collection/reject';
import findIndex from 'lodash/array/findIndex';
import find from 'lodash/collection/find';
import capitalize from 'lodash/string/capitalize';

import Log from '../_lib/log';
import window from '../../server/adaptors/window';
import DataLoader from '../../server/adaptors/data-loader';
import Nulls from '../flux/nulls';
import tweetCounts from '../flux/tweetCounts';
import fetchSocialMediaData from '../_lib/social-media-fetcher';
import socialMediaFormatter from '../_lib/social-media-formatter';

const _state = Object.assign({
  currentPage: Nulls.page,
  blogCategory: 'all',
  searchQuery: Nulls.searchQuery,
  modal: Nulls.modal,
  colours: Nulls.colours,
  takeover: Nulls.takeover,
  caseStudy: Nulls.caseStudy,
  twitterShares: Nulls.twitterShares,
  facebookShares: Nulls.facebookShares
}, window.state);
if(_state.takeover && window.localStorage.getItem('takeover-'+_state.takeover.id)) {
  _state.takeover.seen = true;
}

function applyData(data, type) {
  const changeSet = {};
  let value;
  if (type === 'twitterShares' || type === 'facebookShares') {
    const response = socialMediaFormatter(data, type);
    value = getCountFromResponse(response);
  } else {
    value = data;
  }
  changeSet[type] = value;
  Object.assign(_state, changeSet);
  Log('Loaded', type, _state[type]);
}
function applyJobDetailData(job) {
  const index = findIndex(_state.jobs, 'shortcode', job.shortcode);
  _state.jobs[index] = job;
  Log('Added job details', job);
}
function applySocialMediaDataForPosts(data, type) {
  const response = socialMediaFormatter(data, type);
  const index = findIndex(_state.posts, 'slug', response.slug);
  if (index > -1) {
    const value = getCountFromResponse(response);
    _state.posts[index][type] = value;
    Log(`Added ${type}`, value);
  }
}
function getCountFromResponse(response) {
  let value = response.count;
  if (response.type === 'twitterShares') {
    const oldCount = find(tweetCounts, 'slug', response.slug);
    if (oldCount) {
      value += oldCount.count;
    }
  }
  return value;
}

window._state = _state;

export default {
  setPage(newPage, statusCode) {
    const newPageIdArray = newPage.split('/');
    const slug = newPageIdArray[newPageIdArray.length - 1];
    if(_state.page && _state.page.slug !== slug) {
      _state.page = null;
    }
    if(newPage !== 'blog/search-results') {
      _state.searchQuery = null;
    }
    if(newPage !== 'blog/category') {
      _state.blogCategory = 'all';
    }
    if(newPage !== 'blog/post') {
      _state.twitterShares = null;
      _state.facebookShares = null;
    }
    _state.currentPage = newPage;
    _state.statusCode = statusCode;
    _state.posts = null;
    _state.modal = null;
    return Promise.resolve(_state);
  },
  loadData(itemsToLoad) {
    itemsToLoad = reject(itemsToLoad, item => {
      return item.cache !== false && ((!item.slug && _state[item.type]) || (_state[item.type] && _state[item.type].slug === item.slug));
    });
    return DataLoader(itemsToLoad, applyData).then(() => _state);
  },
  setBlogCategoryTo(id) {
    _state.blogCategory = id;
    return Promise.resolve(_state);
  },
  setSearchQueryTo(string) {
    _state.searchQuery = string;
    return Promise.resolve(_state);
  },
  showContacts() {
    _state.modal = 'contacts';
    return Promise.resolve(_state);
  },
  showNavOverlay() {
    _state.modal = 'navigation';
    return Promise.resolve(_state);
  },
  closeTakeover() {
    if(_state.takeover) {
      window.localStorage.setItem('takeover-'+_state.takeover.id, true);
      _state.takeover.seen = true;
    }
    return Promise.resolve(_state);
  },
  closeModal() {
    _state.modal = Nulls.modal;
    return Promise.resolve(_state);
  },
  getJobDetails(jid) {
    let promise;
    const job = find(_state.jobs, 'shortcode', jid);
    if(job.description) {
      promise = Promise.resolve(_state);
    } else {
     promise = DataLoader([{
        url: `ustwo/v1/jobs/${jid}`,
        type: 'job'
      }], applyJobDetailData).then(() => _state);
    }
    return promise;
  },
  showSearch() {
    _state.modal = 'search';
    return Promise.resolve(_state);
  },
  showBlogCategories() {
    _state.modal = 'blogCategories';
    return Promise.resolve(_state);
  },
  getSocialSharesForPost() {
    const slug = _state.page.slug;
    let promise;
    if (slug) {
      promise = fetchSocialMediaData(slug, applyData)
        .then(() => _state);
    } else {
      promise = Promise.resolve(_state);
    }
    return promise;
  },
  getSocialSharesForPosts() {
    return Promise.all(_state.posts.map(post => {
      let promise;
      if (post.slug) {
        promise = fetchSocialMediaData(post.slug, applySocialMediaDataForPosts)
          .then(() => _state);
      } else {
        promise = Promise.resolve(_state);
      }
      return promise;
    })).then(() => _state);
  }
};
