import React from 'react';
import ReactDOM from 'react-dom';
import { get } from 'lodash';

import ScrollTracker from 'app/adaptors/server/scroll-tracker';

function getScrollTrackerMixin(pageName) {
  return {
    setupScrollTracker() {
      if(!this.scrollTracker && get(this.props, 'page')) {
        this.scrollTracker = new ScrollTracker(pageName, ReactDOM.findDOMNode(this));
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
