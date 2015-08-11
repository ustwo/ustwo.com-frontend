import Store from './store';

const Actions = {
  goTo(pageId, statusCode, itemsToLoad) {
    itemsToLoad && Store.loadData(itemsToLoad);
    Store.setPage(pageId, statusCode);
    Store.emitChange();
  },
  showContacts() {
    Store.showContacts();
    Store.emitChange();
  },
  openNav() {
    Store.openNav();
    Store.emitChange();
  },
  closeNav() {
    Store.closeNav();
    Store.emitChange();
  },
  closeTakeover() {
    Store.closeTakeover();
    Store.emitChange();
  },
  closeModal() {
    Store.closeModal();
    Store.emitChange();
  }
};

export default Actions;
