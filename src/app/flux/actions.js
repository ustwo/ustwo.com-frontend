import Store from './store';

const Actions = {
  goTo(pageId, statusCode) {
    return Store.setPage(pageId, statusCode);
  },
  loadData(itemsToLoad) {
    return Store.loadData(itemsToLoad || []);
  },
  setBlogCategoryTo(id) {
    return Store.setBlogCategoryTo(id);
  },
  setSearchQueryTo(string) {
    return Store.setSearchQueryTo(string);
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
  },
  getJobDetails(jid) {
    return Store.getJobDetails(jid);
  },
  showSearch() {
    return Store.showSearch();
  }
};

export default Actions;
