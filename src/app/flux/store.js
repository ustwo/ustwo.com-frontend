import window from '../../server/adaptors/window';
import DataLoader from '../../server/adaptors/data-loader';
import Nulls from '../flux/nulls';

console.log("Store detecting window.state", window.state);

const _state = Object.assign({
  currentPage: Nulls.page,
  showNav: false,
  modal: Nulls.modal,
  colours: Nulls.colours,
  takeover: {
    id: "moodnotes-launch"
  },
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
if(window.localStorage.getItem('takeover-'+_state.takeover.id)) {
  _state.takeover = Nulls.takeover;
}

function applyData(type, data) {
  _state[type] = Object.assign(_state[type] || {}, data);
  console.log('Loaded', type, _state[type]);
}

export default {
  setPage(newPage, statusCode) {
    _state.currentPage = newPage;
    _state.statusCode = statusCode;
    return Promise.resolve(_state);
  },
  loadData(itemsToLoad) {
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
    window.localStorage.setItem('takeover-'+_state.takeover.id, true);
    _state.takeover = Nulls.takeover;
    return Promise.resolve(_state);
  },
  closeModal() {
    _state.modal = Nulls.modal;
    return Promise.resolve(_state);
  }
};
