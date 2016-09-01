'use strict';

import React from 'react';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';

import renderModules from 'app/lib/module-renderer';
import getFeaturedImage from 'app/lib/get-featured-image';
import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';

import WorkItem from 'app/components/work-item';
import Hero from 'app/components/hero';
import TestimonialCarousel from 'app/components/testimonial-carousel';

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
      {this.renderTestimonialCarousel()}
      <div className="card-list work-items-list">
        {this.renderCaseStudies(caseStudies)}
      </div>
    </article>;
  },
  renderTestimonialCarousel() {
    const { page } = this.props;
    const testimonials = get(page, '_embedded.ustwo:testimonials', []);
    if(testimonials.length > 0) {
      return <TestimonialCarousel testimonials={testimonials}/>
    }
  },
  renderCaseStudies(caseStudies) {
    const { page } = this.props;
    return caseStudies.map(caseStudy => {
      const attachments = get(page, '_embedded.wp:attachment');
      const image = getFeaturedImage(caseStudy, attachments);
      const featured = caseStudies.indexOf(caseStudy) === 0;
      return <WorkItem
        key={caseStudy.slug}
        data={caseStudy}
        image={image}
        featured={featured}
      />;
    });
  }
});

export default PageWhatWeDo;
