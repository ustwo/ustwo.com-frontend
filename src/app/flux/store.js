import reject from 'lodash/collection/reject';

import window from '../../server/adaptors/window';
import DataLoader from '../../server/adaptors/data-loader';
import Nulls from '../flux/nulls';

const _state = Object.assign({
  currentPage: Nulls.page,
  showNav: false,
  modal: Nulls.modal,
  colours: Nulls.colours,
  takeover: null,
  pages: [{
    id: "home",
    ga: "home",
    title: "Home",
    url: "/"
  }, {
    id: "what-we-do",
    ga: "what_we_do",
    title: "What we do",
    url: "/what-we-do"
  }, {
    id: "blog",
    ga: "blog",
    title: "Blog",
    url: "/blog"
  }, {
    id: "join-us",
    ga: "join_us",
    title: "Join us",
    url: "http://ustwo.workable.com/",
    external: true
  }],
  caseStudy: Nulls.caseStudy
}, window.state);
if(_state.takeover && window.localStorage.getItem('takeover-'+_state.takeover.id)) {
  _state.takeover.seen = true;
}

function applyData(type, data) {
  _state[type] = Object.assign(_state[type] || {}, data);
  console.log('Loaded', type, _state[type]);
}

export default {
  setPage(newPage, statusCode) {
    const newPageIdArray = newPage.split('/');
    const slug = newPageIdArray[newPageIdArray.length - 1];
    if(_state.page && _state.page.slug !== slug) {
      _state.page = null;
    }
    _state.currentPage = newPage;
    _state.statusCode = statusCode;
    return Promise.resolve(_state);
  },
  loadData(itemsToLoad) {
    itemsToLoad = reject(itemsToLoad, item => {
      return (!item.slug && _state[item.type]) || (_state[item.type] && _state[item.type].slug === item.slug);
    });
    return DataLoader(itemsToLoad, applyData).then(() => _state);
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
      _state.takeover = Nulls.takeover;
    }
    return Promise.resolve(_state);
  },
  closeModal() {
    _state.modal = Nulls.modal;
    return Promise.resolve(_state);
  }
};
