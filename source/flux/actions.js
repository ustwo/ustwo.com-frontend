import Store from './store';

const Actions = {
  goTo(pageId) {
    Store.setPage(pageId);
    Store.emitChange();
  }
};

window.Actions = Actions;

export default Actions;
