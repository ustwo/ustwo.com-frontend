import React, { Component } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import getFeaturedImage from 'app/lib/get-featured-image';

import WorkItem from 'app/components/work-item';
import Hero from 'app/components/hero';
import TestimonialCarousel from 'app/components/testimonial-carousel';
import Video from 'app/components/video';
import Footer from 'app/components/footer';
import WorkProcess from 'app/components/work-process';

class PageWork extends Component {

  renderWhatWeDo() {
    const { isMobile } = this.props;
    const workIntroExtra = workData.intro.extra.map(item => <p className="work-intro-extra">{item}</p>);

    return (
      <div className="work-whatwedo">
        <div className="work-intro">
          <p className="work-intro-statement">{workData.intro.statement}</p>
          {workIntroExtra}
        </div>
        <div className="work-contact">
          {workData.contact}
        </div>
        <WorkProcess data={workData.process} isMobile={isMobile} />
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
    const { page, className, loaded, isMobile, footer, studios, currentPage } = this.props;
    const caseStudies = get(page, '_embedded.ustwo:case_studies', []);
    const image = getFeaturedImage(page);
    const classes = classnames('page-work', className);

    console.log(caseStudies);

    let fallbackImage;
    if (isMobile) {
      fallbackImage = '/images/work-header-fallback.jpg';
    } else {
      fallbackImage = '/images/work-header-fallback.jpg';
    }

    let src;
    if (isMobile) {
      src = 'https://player.vimeo.com/external/209403984.sd.mp4?s=fa5d1e9fcb9e3f78d55423329a605fc7db82541f&profile_id=164';
    } else {
      src = 'https://player.vimeo.com/external/209403984.hd.mp4?s=f3eb84f4b6d45960e28df740875cddd9605b8cf6&profile_id=174';
    }

    const video = (
      <Video
        src={src}
        isVideoBackground={true}
        play={loaded}
        heroVideo={true}
        imageCSS={fallbackImage}
        isMobile={isMobile}
      />
    );

    return (
      <article className={classes}>
        <Hero
          title="We build products and services that make a difference"
          transitionImage={true}
          eventLabel='work'
          showDownIndicator={true}
          video={video}
        ></Hero>

        {this.renderWhatWeDo()}

        {this.renderTestimonialCarousel()}

        <div className="card-list work-items-list">
          {this.renderCaseStudies(caseStudies)}
        </div>

        <Footer data={footer} studios={studios} currentPage={currentPage}/>

      </article>
    );
  }
};

export default PageWork;

const workData = {
  intro: {
    statement: 'We use technology, design and digital product thinking to solve the business problems that matter. Our goal is to transform people’s lives by keeping the user at the heart of it all.',
    extra: [
      'We work with you all the way through the product life cycle.'
    ]
  },
  contact: 'Get in touch or explore more below to find ways we can work together.',
  process: [{
    title: 'Discovery & Strategy',
    image: '/images/illustration-discovery.svg',
    text: 'Innovate and stay ahead. Refine business goals and validate opportunities by understanding what your customers want most.'
  },{
    title: 'Design and Build',
    image: '/images/illustration-design-and-build.svg',
    text: 'Stand out from the competition. Truly agile software development, exceptional execution and world-class engineering.'
  },{
    title: 'Launch and Scale',
    image: '/images/illustration-launch-and-scale.svg',
    text: 'Stay relevant and respond to customer needs. Get your product out in the market – refine, grow and prove your return on investment.'
  }]
}
