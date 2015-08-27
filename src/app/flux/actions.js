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
  showNavOverlay() {
    return Store.showNavOverlay();
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
  },
  showBlogCategories() {
    return Store.showBlogCategories();
  },
  getSocialSharesForPost() {
    return Store.getSocialSharesForPost();
  },
  getSocialSharesForPosts() {
    return Store.getSocialSharesForPosts();
  }
};

export default Actions;
