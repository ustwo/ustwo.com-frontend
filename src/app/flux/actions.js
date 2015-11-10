import Store from './store';

const Actions = {
  goTo(pageId, statusCode) {
    Store.setPage(pageId, statusCode);
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
  getSocialSharesForPost() {
    Store.getSocialSharesForPost();
  },
  getSocialSharesForPosts() {
    Store.getSocialSharesForPosts();
  },
  loadMorePosts() {
    Store.loadMorePosts();
  },
  resetPosts() {
    Store.resetPosts();
  }
};

export default Actions;
