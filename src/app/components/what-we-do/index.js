'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import renderModules from '../../lib/module-renderer';
import getFeaturedImage from '../../lib/get-featured-image';
import getScrollTrackerMixin from '../../lib/get-scroll-tracker-mixin';

import WorkItem from '../work-item';
import Hero from '../hero';

const PageWhatWeDo = React.createClass({
  mixins: [getScrollTrackerMixin('what-we-do')],
  render() {
    const { page } = this.props;
    const caseStudiesModule = find(get(page, 'page_builder', []), 'name', 'case_studies');
    const image = getFeaturedImage(page);

    return (
      <article className="page-work">
        <Hero
          title={get(page, 'display_title')}
          transitionImage={true}
          sizes={get(image, 'media_details.sizes')}
          altText={get(image, 'alt_text')}
          eventLabel='what-we-do'
          showDownChevron={true}
        />
        {renderModules({
          modules: get(page, 'page_builder', []),
          colours: get(page, 'colors'),
          zebra: false
        })}
        <ul>
          {this.renderCaseStudies(caseStudies)}
        </ul>
        <ul>
          {get(caseStudiesModule, 'attr.case_studies.value', '').split(',').map(caseStudyName => {
            const caseStudyData = find(get(page, '_embedded.ustwo:case_studies', []), 'slug', caseStudyName);
            return <WorkItem key={caseStudyName} data={caseStudyData} attachments={get(page, '_embedded.wp:attachment', [])} />;
          })}
        </ul>
      </article>
    );
  }
});

export default PageWhatWeDo;
