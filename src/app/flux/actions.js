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
  showNavOverlay() {
    Store.showNavOverlay();
  },
  closeModal() {
    Store.closeModal();
  },
  getJobDetails(jid) {
    Store.getJobDetails(jid);
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
  },
  testimonialsPosition(position) {
    Store.testimonialsPosition(position);
  },
  showPopup(name) {
    Store.showPopup(name);
  },
  closePopup() {
    Store.closePopup();
  },
  menuHover(name) {
    Store.menuHover(name);
  },
  overflowHidden() {
    Store.overflowHidden();
  },
  overflowAuto() {
    Store.overflowAuto();
  },
  showVideoOverlay(src) {
    Store.showVideoOverlay(src);
  },
  setWindowHeight(number) {
    Store.setWindowHeight(number);
  }
};

export default Actions;
