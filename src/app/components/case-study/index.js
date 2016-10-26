import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import Meta from 'react-helmet';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';
import renderModules from 'app/lib/module-renderer';
import RelatedContent from 'app/components/related-content';

const PageCaseStudy = React.createClass({
  mixins: [getScrollTrackerMixin('case-study')],
  render() {
    const { caseStudy } = this.props;
    const classes = classnames('page-case-study', this.props.className);
    return <article className={classes}>
      <Meta
        title={get(caseStudy, 'seo.title') || ''}
        meta={[{
          name: "description",
          content: get(caseStudy, 'seo.desc') || ''
        }, {
          name: "keywords",
          content: get(caseStudy, 'seo.keywords') || ''
        }, {
          property: "og:type",
          content: 'website'
        }, {
          property: "og:title",
          content: get(caseStudy, 'seo.title') || ''
        }, {
          property: "og:description",
          content: get(caseStudy, 'seo.desc') || ''
        }, {
          property: "og:image",
          content: get(caseStudy, 'seo.image') || ''
        }]}
      />
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
      {this.renderRelatedContent()}
    </article>;
  },
  renderRelatedContent() {
    let relatedContent;
    if(this.props.relatedContent.length) {
      relatedContent = <RelatedContent content={this.props.relatedContent} />
    }
    return relatedContent;
  }
});

export default PageCaseStudy;
