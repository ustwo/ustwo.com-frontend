import React from 'react';
import Flux from 'app/flux';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';
import Navigation from 'app/components/navigation';

const Page404 = React.createClass({
  mixins: [getScrollTrackerMixin('404')],

  render() {
    return (
      <article className="page-404">
        <div className="page-404-large-text">404</div>
        <p>Whoops! There's a whole load of nothing here. <br />But no need to worry. Hit the <button onClick={Flux.override('/')}>home page</button>... or read something on the <button onClick={Flux.override('/blog')}>blog</button>?</p>
      </article>
    );
  }
});

export default Page404;
