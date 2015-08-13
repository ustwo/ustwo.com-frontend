import React from 'react';
import get from 'lodash/object/get';

import ModuleRenderer from '../_lib/module-renderer';

export default class PageCaseStudy extends React.Component {
  render() {
    const caseStudy = this.props.page;
    return (
      <article className="page-case-study">
        <style>{`
          .page-case-study a {
            border-bottom-color: ${get(caseStudy, 'colors.secondary')};
          }
        `}</style>
        {get(caseStudy, 'page_builder', []).map(this.getModuleRenderer(get(caseStudy, 'colors')))}
      </article>
    );
  }
  getModuleRenderer = (colours) => {
    return (moduleData) => {
      return ModuleRenderer(moduleData, colours, () => {
        this.zebra = !this.zebra;
        return this.zebra;
      });
    };
  }
}
