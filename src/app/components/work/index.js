import React, { Component } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import getFeaturedImage from 'app/lib/get-featured-image';
import env from 'app/adaptors/server/env';
import Flux from 'app/flux';

import WorkItem from 'app/components/work-item';
import TestimonialCarousel from 'app/components/testimonial-carousel';
import Video from 'app/components/video';
import Footer from 'app/components/footer';
import WorkProcess from 'app/components/work-process';
import ScrollWrapper from 'app/components/scroll-wrapper';
import WorkHero from 'app/components/work-hero';
import ContactBlock from 'app/components/contact-block';
import WorkVerticals from 'app/components/work-verticals';
import ContactButton from 'app/components/contact-button';

class PageWork extends Component {

  renderWhatWeDo() {
    const { isMobile } = this.props;
    const workIntroExtra = workData.intro.extra.map(item => <p className="work-intro-extra">{item}</p>);

    return (
      <div className="work-whatwedo-wrapper">
        <div className="work-whatwedo">
          <div className="work-intro">
            <p className="work-intro-statement">{workData.intro.statement}</p>
            {workIntroExtra}
          </div>
        </div>
        <WorkProcess data={workData.process} isMobile={isMobile} />
        <div className="work-contact">
          <ContactButton />
        </div>
      </div>
    );
  }

  renderTestimonialCarousel() {
    const { page, fixedHeight } = this.props;
    const testimonials = get(page, '_embedded.ustwo:testimonials', []);

    if(testimonials.length > 0) {
      return (
        <TestimonialCarousel testimonials={testimonials} fixedHeight={fixedHeight} />
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
    const { page, className, loaded, isMobile, footer, studios, currentPage, fixedHeight, documentScrollPosition, viewportDimensions, popup, modal } = this.props;
    const caseStudies = get(page, '_embedded.ustwo:case_studies', []);
    const image = getFeaturedImage(page);
    const classes = classnames('page-work', className);

    return (
      <article className={classes}>

        <div className="home-pinned-header-wrapper">
          <div className="home-pinned-header-inner">
            <ScrollWrapper
              component={<WorkHero loaded={loaded} modal={modal} isMobile={isMobile} fixedHeight={fixedHeight} />}
              documentScrollPosition={documentScrollPosition}
              viewportDimensions={viewportDimensions}
              requireScreenPosition={true}
              className="scroll-wrapper-work-hero"
            />
          </div>
        </div>

        <div className="home-main-content-wrapper">

          {this.renderWhatWeDo()}

          {this.renderTestimonialCarousel()}

          <div className="card-list work-items-list">
            <div className="card-list-inner">
              {this.renderCaseStudies(caseStudies)}
            </div>
          </div>

          <WorkVerticals data={workData.verticals} />

          <ScrollWrapper
            component={<ContactBlock />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            requireScreenPosition={true}
            className="scroll-wrapper-contact-block"
          />
          <Footer data={footer} studios={studios} currentPage={currentPage}/>

        </div>

      </article>
    );
  }
};

export default PageWork;

const workData = {
  intro: {
    statement: 'From strategy through to launching products, getting ideas out into the world is what matters. We solve business challenges with digital products and services that are transformational and loved.',
    extra: [
      'We join with you as one team to bring business strategy, product design, team coaching and world-class engineering to the full product lifecycle. True change doesn’t happen flying solo.'
    ]
  },
  process: [{
    name: 'discovery',
    title: 'Discovery & Strategy',
    image: '/images/illustration-discovery.svg',
    text: 'Innovate and stay ahead. Refine business goals and validate opportunities by understanding what your customers want most.'
  },{
    name: 'design',
    title: 'Design & Build',
    image: '/images/illustration-design-and-build.svg',
    text: 'We design for the unknown and help organisations stand out from the competition. Truly agile software development, exceptional execution and world-class engineering.'
  },{
    name: 'launch',
    title: 'Launch & Scale',
    image: '/images/illustration-launch-and-scale.svg',
    text: 'Stay relevant and respond to customer needs. Get your product out in the market - refine, grow and prove your return on investment.'
  }],
  verticals: {
    title: 'Areas of Interest',
    introText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    auto: {
      type: 'Expertise',
      title: 'Auto',
      text: 'The ustwo Auto team explore user experience in the automotive space with client engagements and our own research and experimental projects, building services and products around the connected car.'
    },
    health: {
      type: 'Expertise',
      title: 'Health',
      text: 'ustwo collaborates with clients, healthcare professionals and academic experts to create lasting, meaningful digital health solutions.'
    }
  }
}
