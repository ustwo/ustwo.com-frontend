import React from 'react';
import get from 'lodash/object/get';

import getScrollTrackerMixin from '../../lib/get-scroll-tracker-mixin';
import ModuleRenderer from '../../lib/module-renderer';

const PageCaseStudy = React.createClass({
  mixins: [getScrollTrackerMixin('case-study')],
  render() {
    const caseStudy = this.props.page;
    return <article className="page-case-study">
      <style>{`
        .page-case-study a {
          border-bottom-color: ${get(caseStudy, 'colors.secondary')};
        }
      `}</style>
      {get(caseStudy, 'page_builder', [])
        .map(this.assignColours)
        .map(this.getModuleRenderer())}
    </article>;
  },
  assignColours(moduleData) {
    const { page: caseStudy } = this.props;
    return Object.assign(moduleData, { colours: get(caseStudy, 'colors') });
  },
  getModuleRenderer() {
    return (moduleData, index) => {
      return ModuleRenderer(moduleData, index, () => {
        this.zebra = !this.zebra;
        return this.zebra;
      });
    };
  }
});

export default PageCaseStudy;
