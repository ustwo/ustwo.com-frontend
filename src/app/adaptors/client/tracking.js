'use strict';

import ScrollMagic from 'app/adaptors/server/scroll-magic';

export default class Tracking {
  scrollController = new ScrollMagic.Controller();
  scrollTrackerScene = null;

  addPageScrollTracking(pageName, pageElement) {
    // NOTE: we're assuming that only one page needs to be tracked at a time, and
    // that tracking state should be reset for each page visit within the same session.
    if (this.scrollTrackerScene) {
      console.warn('Trying to initialise tracking for page before removing previous!');
      removePageScrollTracking();
    }

    this.scrollTrackerScene = new ScrollMagic.Scene({
        triggerElement: pageElement,
        triggerHook: 'onLeave',
        duration: () => {return pageElement.clientHeight}
      })
      .addTo(this.scrollController);
  }

  removePageScrollTracking() {
    this.scrollController.removeScene(this.scrollTrackerScene);
    this.scrollTrackerScene = null;
  }
};
