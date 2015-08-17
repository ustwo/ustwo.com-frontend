import Store from './store';

const Actions = {
  goTo(pageId, statusCode) {
    return Store.setPage(pageId, statusCode);
  },
  loadData(itemsToLoad) {
    return Store.loadData(itemsToLoad || []);
  },
  setSearchQuery(params) {
    return Store.setSearchQuery(params);
  },
  showContacts() {
    return Store.showContacts();
  },
  openNav() {
    return Store.openNav();
  },
  closeNav() {
    return Store.closeNav();
  },
  closeTakeover() {
    return Store.closeTakeover();
  },
  closeModal() {
    return Store.closeModal();
  }
};

export default Actions;
