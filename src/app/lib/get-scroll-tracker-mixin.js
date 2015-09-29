import React from 'react';
import get from 'lodash/object/get';

import ScrollTracker from '../adaptors/server/scroll-tracker';

function getScrollTrackerMixin(pageName) {
  return {
    setupScrollTracker() {
      if(!this.scrollTracker && get(this.props, 'page')) {
        this.scrollTracker = new ScrollTracker(pageName, React.findDOMNode(this));
      }
    },
    componentDidMount() {
      this.setupScrollTracker();
    },
    componentDidUpdate() {
      this.setupScrollTracker();
    },
    componentWillUnmount() {
      this.scrollTracker && this.scrollTracker.teardown();
    }
  };
}

export default getScrollTrackerMixin;
