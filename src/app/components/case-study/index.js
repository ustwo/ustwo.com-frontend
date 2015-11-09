import React from 'react';
import get from 'lodash/object/get';

import getScrollTrackerMixin from '../../lib/get-scroll-tracker-mixin';
import renderModules from '../../lib/module-renderer';

const PageCaseStudy = React.createClass({
  mixins: [getScrollTrackerMixin('case-study')],
  render() {
    const { caseStudy } = this.props;
    return <article className='page-case-study'>
      <style>{`
        .page-case-study a {
          border-bottom-color: ${get(caseStudy, 'colors.secondary')};
        }
      `}</style>
      {renderModules({
        modules: get(caseStudy, 'page_builder', []),
        colours: get(caseStudy, 'colors'),
        zebra: true
      })}
    </article>;
  }
});

export default PageCaseStudy;
