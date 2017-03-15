import React, { Component } from 'react';
import classnames from 'classnames';
import { get, kebabCase } from 'lodash';
import getFeaturedImage from 'app/lib/get-featured-image';
import ReactSwipe from 'react-swipe';

import WorkItem from 'app/components/work-item';
import Hero from 'app/components/hero';
import TestimonialCarousel from 'app/components/testimonial-carousel';
import Video from 'app/components/video';

class PageWork extends Component {

  renderWhatWeDo() {
    const workIntroExtra = workData.intro.extra.map(item => <p className="work-intro-extra">{item}</p>);
    const workProcess = workData.process.map(item => {
      return (
        <div className={`work-process-item ${kebabCase(item.title)}`}>
          <img src={item.image} alt={`${item.title} icon`} />
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </div>
      );
    });
    const swipeOptions = {
      speed: 300,
      disableScroll: false,
      stopPropagation: false,
      continuous: true
    };

    const carouselStyle = {
      wrapper: { width: "100%" }
    }

    let renderContent;
    if (this.props.isMobile) {
      renderContent = (
        <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
          {workProcess}
        </ReactSwipe>
      );
    } else {
      renderContent = workProcess;
    }

    return (
      <div className="work-whatwedo">
        <div className="work-intro">
          <p className="work-intro-statement">{workData.intro.statement}</p>
          {workIntroExtra}
        </div>
        <div className="work-contact">
          {workData.contact}
        </div>
        <div className="work-process">
          {renderContent}
        </div>
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
    const video = (
      <Video
        src="/images/work-header-video.mp4"
        sizes={get(image, 'media_details.sizes')}
        isVideoBackground={true}
        play={true}
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
    title: 'Discovery',
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
