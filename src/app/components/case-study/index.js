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
      {this.renderModules(get(caseStudy, 'page_builder', []))}
    </article>;
  },
  renderModules(modules) {
    const colours = get(this.props.page, 'colors');
    return modules
      .map(moduleData => Object.assign(moduleData, { colours: colours }))
      .map(this.getModuleRenderer());
  },
  getModuleRenderer() {
    return (moduleData, index) => {
      return ModuleRenderer(moduleData, index, () => {
        this.zebra = !this.zebra;
        console.log('this.zebra', this.zebra);
        return this.zebra;
      });
    };
  }
});

export default PageCaseStudy;
