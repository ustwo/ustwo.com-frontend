import {EventEmitter} from 'events';
import assign from 'lodash/object/assign';
import clone from 'lodash/lang/cloneDeep';
import capitalize from 'lodash/string/capitalize';
import 'whatwg-fetch';

let _data = {};

const _state = {
  page: null,
  data: {
    pages: []
  }
};

const Store = assign({}, EventEmitter.prototype, {
  getData() {
    return _state;
  },
  emitChange() {
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

// This is currently broken in IE11: https://github.com/github/fetch/issues/114
fetch('/data/gulpdata.json')
  .then((response) => {
    return response.json();
  }).then((json) => {
    _data = json;
    _state.data = json;
    Store.emitChange();
  }).catch(function(ex) {
    console.warn('App data JSON parsing failed:', ex);
  });

export default {
  init: Store.init,
  getData: Store.getData,
  emitChange: Store.emitChange,
  addChangeListener: Store.addChangeListener,
  removeChangeListener: Store.removeChangeListener,

  setPage(newPage) {
    _state.page = newPage;
  }
};
