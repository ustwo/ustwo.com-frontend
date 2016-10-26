'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import { get } from 'lodash';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';

import Navigation from 'app/components/navigation';

const Page404 = React.createClass({
  mixins: [getScrollTrackerMixin('404')],
  render() {
    return <article className="page-404">
      <img src="/images/404.jpg" alt="404, Whoops nothing here" />
    </article>;
  }
});

export default Page404;
