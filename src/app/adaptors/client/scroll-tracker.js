'use strict';

import Track from 'app/adaptors/server/track';

function getScrollTop() {
  if(typeof pageYOffset!= 'undefined'){
    //most browsers except IE before #9
    return pageYOffset;
  } else {
    var B= document.body; //IE 'quirks'
    var D= document.documentElement; //IE with doctype
    D= (D.clientHeight)? D: B;
    return D.scrollTop;
  }
}

function trackEvent(category, action, label) {
  // Google Analytics – for more options see: https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
  Track('send', {
    'hitType': 'event',          // Required.
    'eventCategory': category,   // Required.
    'eventAction': action,      // Required.
    'eventLabel': label
  });
}

function ScrollTracker (pageName, pageElement) {
  this.pageName = pageName;
  this.pageElement = pageElement;
  this.windowHeight = window.innerHeight || 400;
  this.pageHeight = this.pageElement.clientHeight;
  this.top = false;
  this.middle = false;
  this.bottom = false;
  this.onScrollBound = this.onScroll.bind(this);
  setTimeout(() => {
    this.setup();
  }, 100);
}
ScrollTracker.prototype = {
  constructor: ScrollTracker,
  onScroll() {
    this.scrollTop = getScrollTop();
    if(!this.top && this.scrollTop >= this.windowHeight) {
      this.top = true;
      trackEvent('page', 'scroll_1', this.pageName);
    }
    if(!this.middle && this.scrollTop >= ((this.pageHeight/2) - (this.windowHeight/2))) {
      this.middle = true;
      trackEvent('page', 'scroll_2', this.pageName);
    }
    if(!this.bottom && this.scrollTop >= this.pageHeight - this.windowHeight) {
      this.bottom = true;
      trackEvent('page', 'scroll_3', this.pageName);
    }
  },
  setup() {
    document.onscroll = this.onScrollBound;
  },
  teardown() {
    if(document.onscroll === this.onScrollBound) {
      document.onscroll = null;
    }
  }
};

export default ScrollTracker;
