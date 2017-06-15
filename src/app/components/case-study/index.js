import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import Meta from 'react-helmet';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';
import renderModules from 'app/lib/module-renderer';
import ScrollWrapper from 'app/components/scroll-wrapper';
import RelatedContent from 'app/components/related-content';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';

const PageCaseStudy = React.createClass({
  mixins: [getScrollTrackerMixin('case-study')],
  render() {
    const { caseStudy, documentScrollPosition, viewportDimensions, footer, studios, currentPage } = this.props;

    let caseStudyName;
    if (caseStudy && caseStudy.name === 'ustwo Auto') {
      caseStudyName = 'ustwo-auto';
    }

    const classes = classnames('page-case-study', this.props.className, caseStudyName);

    return (
      <article className={classes}>
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
          zebra: true,
          categories: get(caseStudy, 'categories')
        })}
        {this.renderRelatedContent()}
        <ScrollWrapper
          component={<ContactBlock />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          requireScreenPosition={true}
          className="scroll-wrapper-contact-block"
        />
        <Footer data={footer} studios={studios} currentPage={currentPage}/>
      </article>
    );
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
