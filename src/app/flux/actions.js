import Store from './store';

const Actions = {
  goTo(pageId, statusCode, itemsToLoad) {
    return Store.setPage(pageId, statusCode, itemsToLoad || []);
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
