'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';

import getScrollTrackerMixin from '../../lib/get-scroll-tracker-mixin';

import Navigation from '../navigation';

const page404 = React.createClass({
  mixins: [getScrollTrackerMixin('404')],
  render() {
    const pageData = this.props.page;
    return (
      <article className="page-404">

        <img src="/images/404.jpg" alt="404, Whoops nothing here" />

      </article>
    );
  }
});

export default page404;
