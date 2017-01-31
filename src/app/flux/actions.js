import Store from './store';

const Actions = {
  goTo(page, params, hash, statusCode) {
    Store.setPage(page, params, hash, statusCode);
  },
  loadData(itemsToLoad) {
    Store.loadData(itemsToLoad || []);
  },
  setBlogCategoryTo(id) {
    Store.setBlogCategoryTo(id);
  },
  setSearchQueryTo(string) {
    Store.setSearchQueryTo(string);
  },
  showContacts() {
    Store.showContacts();
  },
  showNavOverlay() {
    Store.showNavOverlay();
  },
  closeTakeover() {
    Store.closeTakeover();
  },
  closeModal() {
    Store.closeModal();
  },
  getJobDetails(jid) {
    Store.getJobDetails(jid);
  },
  showSearch() {
    Store.showSearch();
  },
  hideSearch() {
    Store.hideSearch();
  },
  showBlogCategories() {
    Store.showBlogCategories();
  },
  loadMorePosts() {
    Store.loadMorePosts();
  },
  resetPosts() {
    Store.resetPosts();
  },
  loadMoreEvents() {
    Store.loadMoreEvents();
  },
  loadMoreArchivedEvents() {
    Store.loadMoreArchivedEvents();
  },
  setEventsStudioTo(id) {
    Store.setEventsStudioTo(id);
  }
};

export default Actions;
