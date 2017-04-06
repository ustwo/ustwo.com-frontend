import React from 'react';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';
import Navigation from 'app/components/navigation';

const Page404 = React.createClass({
  mixins: [getScrollTrackerMixin('404')],

  render() {
    return (
      <article className="page-404">
        <div className="page-404-large-text">404</div>
        <p>Whoops nothing here</p>
      </article>
    );
  }
});

export default Page404;
