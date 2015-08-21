import reject from 'lodash/collection/reject';
import findIndex from 'lodash/array/findIndex';
import find from 'lodash/collection/find';
import capitalize from 'lodash/string/capitalize';
import every from 'lodash/collection/every';

import Log from '../_lib/log';
import window from '../../server/adaptors/window';
import DataLoader from '../../server/adaptors/data-loader';
import Nulls from '../flux/nulls';

const _state = Object.assign({
  currentPage: Nulls.page,
  blogCategory: 'all',
  searchQuery: Nulls.searchQuery,
  showNav: false,
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
  changeSet[type] = data;
  Object.assign(_state, changeSet);
  Log('Loaded', type, _state[type]);
}
function applyJobDetailData(job) {
  const index = findIndex(_state.jobs, 'shortcode', job.shortcode);
  _state.jobs[index] = job;
  Log('Added job details', job);
}
function applyTwitterShareCount(twitterObject) {
  const url = twitterObject.url.split('/');
  const slug = url[-1] || url[url.length-2];
  const index = findIndex(_state.posts, 'slug', slug);
  Object.assign(_state.posts[index], {
    twitterShares: twitterObject.count
  });
  console.log('Added Twitter share count', twitterObject.count);
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
      _state.twitterShares = {};
      _state.facebookShares = {};
    }
    _state.currentPage = newPage;
    _state.statusCode = statusCode;
    _state.posts = null;
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
  openNav() {
    _state.showNav = true;
    return Promise.resolve(_state);
  },
  closeNav() {
    _state.showNav = false;
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
    _state.modal = 'blogCategories'
    return Promise.resolve(_state);
  },
  getSocialSharesForPosts() {
    let promise;
    if (every(_state.posts, 'twitterShares')) {
      promise = Promise.resolve(_state);
    } else {
      promise = Promise.all(_state.posts.map(post => {
        const uri = `http://ustwo.com/blog/${post.slug}`;
        return DataLoader([{
            url: `twitter/count?url=http://ustwo.com/blog/${post.slug}`,
            external: 'twitter',
            type: 'twitterShares'
          }], applyTwitterShareCount).then(() => _state);
      })).then(() => _state);
    }
    return promise;
  }
};
