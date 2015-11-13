'use strict';

import React from 'react';
import classnames from 'classnames';
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
    const caseStudies = get(page, '_embedded.ustwo:case_studies', []);
    const image = getFeaturedImage(page);
    const classes = classnames('page-work', this.props.className);

    return <article className={classes}>
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
      {this.renderCaseStudies(caseStudies)}
    </article>;
  },
  renderCaseStudies(caseStudies) {
    const { page } = this.props;
    return caseStudies.map(caseStudy => {
      const attachments = get(page, '_embedded.wp:attachment');
      const image = getFeaturedImage(caseStudy, attachments);

      return <WorkItem
        key={caseStudy.slug}
        data={caseStudy}
        image={image}
      />;
    });
  }
});

export default PageWhatWeDo;
