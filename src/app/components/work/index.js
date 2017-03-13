import React, { Component } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import getFeaturedImage from 'app/lib/get-featured-image';

import WorkItem from 'app/components/work-item';
import Hero from 'app/components/hero';
import TestimonialCarousel from 'app/components/testimonial-carousel';
import Video from 'app/components/video';

class PageWork extends Component {

  renderWhatWeDo() {
    return (
      <div className="work-whatwedo">
        What we do section
      </div>
    );
  }

  renderTestimonialCarousel() {
    const { page } = this.props;
    const testimonials = get(page, '_embedded.ustwo:testimonials', []);
    
    if(testimonials.length > 0) {
      return (
        <TestimonialCarousel testimonials={testimonials}/>
      );
    }
  }

  renderCaseStudies(caseStudies) {
    const { page } = this.props;

    return caseStudies.map(caseStudy => {
      const attachments = get(page, '_embedded.wp:attachment');
      const image = getFeaturedImage(caseStudy, attachments);
      const featured = caseStudies.indexOf(caseStudy) === 0;

      return (
          <WorkItem
          key={caseStudy.slug}
          data={caseStudy}
          image={image}
          featured={featured}
        />
      );
    });
  }

  render() {
    const { page, className } = this.props;
    const caseStudies = get(page, '_embedded.ustwo:case_studies', []);
    const image = getFeaturedImage(page);
    const classes = classnames('page-work', className);

    return (
      <article className={classes}>
        <Hero
          title={get(page, 'display_title')}
          transitionImage={true}
          eventLabel='work'
          showDownChevron={true}
        >
          <Video
            src={get(page, 'featured_video')}
            sizes={get(image, 'media_details.sizes')}
            isVideoBackground={true}
          />
        </Hero>

        {this.renderWhatWeDo()}

        {this.renderTestimonialCarousel()}

        <div className="card-list work-items-list">
          {this.renderCaseStudies(caseStudies)}
        </div>

      </article>
    );
  }
};

export default PageWork;
