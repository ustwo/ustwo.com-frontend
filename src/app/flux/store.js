import {EventEmitter} from 'events';
import find from 'lodash/collection/find';

import window from '../../server/adaptors/window';
import DataLoader from '../../server/adaptors/data-loader';
import Nulls from '../flux/nulls';
import fetcher from '../_lib/fetcher';

let _data = {};
let callback = ()=>{};

const _state = {
  currentPage: Nulls.page,
  showNav: false,
  modal: Nulls.modal,
  takeover: Nulls.takeover,
  colours: Nulls.colours,
  pages: Nulls.pages,
  caseStudy: Nulls.caseStudy
};
if(window.localStorage.getItem('takeover-'+_state.takeover.id)) {
  _state.takeover = Nulls.takeover;
}

const pageMap = {
  'what-we-do': 66
};

const Store = Object.assign({}, EventEmitter.prototype, {
  init(data, cb) {
    Object.assign(_state, data);
    callback = cb;
  },
  getData() {
    return _state;
  },
  loadData(requiredData) {
    console.log('store', requiredData);
    DataLoader(requiredData, Store.applyData, Store.emitChange, () => callback && callback(_state.statusCode, _state));
  },
  applyData(type, data) {
    _state[type] = Object.assign(_state[type] || {}, data);
    console.log('Loaded', type, _state[type]);
  },
  emitChange() {
    console.log('Store.emitChange', _state);
    Store.emit('change');
  },
  addChangeListener(callback) {
    Store.on('change', callback);
  },
  removeChangeListener(callback) {
    Store.removeListener('change', callback);
  }
});

window.Store = Store;

export default {
  init: Store.init,
  getData: Store.getData,
  loadData: Store.loadData,
  emitChange: Store.emitChange,
  addChangeListener: Store.addChangeListener,
  removeChangeListener: Store.removeChangeListener,

  setPage(newPage, statusCode) {
    _state.currentPage = newPage;
    _state.statusCode = statusCode;
  },
  showContacts() {
    _state.modal = 'contacts';
  },
  openNav() {
    _state.showNav = true;
  },
  closeNav() {
    _state.showNav = false;
  },
  closeTakeover() {
    window.localStorage.setItem('takeover-'+_state.takeover.id, true);
    _state.takeover = Nulls.takeover;
  },
  closeModal() {
    _state.modal = Nulls.modal;
  }
};
