import React, { Component } from 'react';
import classnames from 'classnames';
import Scroll, { Link, Element } from 'react-scroll'; // Animate and scroll to location in document
import { get } from 'lodash';
import getFeaturedImage from 'app/lib/get-featured-image';
import env from 'app/adaptors/server/env';
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';
import kebabCase from 'lodash/string/kebabCase';

import TestimonialCarousel from 'app/components/testimonial-carousel';
import Video from 'app/components/video';
import Footer from 'app/components/footer';
import WorkProcess from 'app/components/work-process';
import ScrollWrapper from 'app/components/scroll-wrapper';
import WorkHero from 'app/components/work-hero';
import ContactBlock from 'app/components/contact-block';
import WorkVerticals from 'app/components/work-verticals';
import ContactButton from 'app/components/contact-button';
import WorkClientsBoard from 'app/components/work-clients-board';
import WorkCaseStudies from 'app/components/work-case-studies';
import FeaturedCaseStudy from 'app/components/featured-case-study';

class PageWork extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caseStudyFilter: 'all',
      numberOfCaseStudiesShowing: 12
    }
  }

  renderWhatWeDo() {
    const { isMobile } = this.props;

    const workIntroExtra = workData.intro.extra.map(item => <p className="work-intro-extra" key={item}>{item}</p>);

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
    const { page, fixedHeight, documentScrollPosition, viewportDimensions } = this.props;
    const testimonials = get(page, '_embedded.ustwo:testimonials', []);

    if(testimonials.length > 0) {
      return (
        <TestimonialCarousel
          testimonials={testimonials}
          fixedHeight={fixedHeight}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
        />
      );
    }
  }

  addMoreCaseStudies() {
    this.setState({
      numberOfCaseStudiesShowing: this.state.numberOfCaseStudiesShowing + 12
    })
  }

  renderWorkItemFilter() {
    const { caseStudyFilter } = this.state;
    const filterItems = ['All', 'Client Work', 'Venture'];

    const renderFilterItems = filterItems.map(item => {
      const classes = classnames({ selected: caseStudyFilter === kebabCase(item) });
      return (
        <button
          className={classes}
          onClick={() => this.setState({ caseStudyFilter: kebabCase(item), numberOfCaseStudiesShowing: 12 })}>
          {item}
        </button>
      );
    });

    return (
      <div className="work-item-filter">
        {renderFilterItems}
      </div>
    );
  }

  render() {
    const { page, className, loaded, isMobile, footer, studios, currentPage, fixedHeight, documentScrollPosition, viewportDimensions, popup, modal } = this.props;
    const { isLoadingMorePosts, numberOfCaseStudiesShowing, caseStudyFilter } = this.state;
    const caseStudies = get(page, '_embedded.ustwo:case_studies', []);
    const image = getFeaturedImage(page);
    const classes = classnames('page-work', className);

    return (
      <article className={classes}>

        <div className="home-pinned-header-wrapper">
          <div className="home-pinned-header-inner">
            <Link to="workMainBlock" smooth={true} duration={1000} className="home-intro-link">
              <ScrollWrapper
                component={<WorkHero loaded={loaded} modal={modal} isMobile={isMobile} fixedHeight={fixedHeight} />}
                documentScrollPosition={documentScrollPosition}
                viewportDimensions={viewportDimensions}
                requireScreenPosition={true}
                className="scroll-wrapper-work-hero"
              />
            </Link>
          </div>
        </div>

        <div className="home-main-content-wrapper">
          <Element name="workMainBlock">
            {this.renderWhatWeDo()}
          </Element>

          {this.renderTestimonialCarousel()}

          <FeaturedCaseStudy content={featuredCaseStudy} />

          <div className="page-work-controls" ref={(ref) => this.workAnchor = ref}>
            {this.renderWorkItemFilter()}
          </div>

          <WorkCaseStudies
            caseStudies={caseStudies}
            page={page}
            numberOfCaseStudiesShowing={numberOfCaseStudiesShowing}
            caseStudyFilter={caseStudyFilter}
            addMoreCaseStudies={this.addMoreCaseStudies.bind(this)}
          />

          <WorkVerticals data={workData.verticals} />

          <WorkClientsBoard logos={workData.clients} title="ustwo work with" />

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
    statement: 'We learn through making. Then apply everything we know to create game-changing digital products and services for clients.',
    extra: [
      'And we always do it collaboratively, through expertly coached teamwork. You and us, working together, discovering answers to the biggest questions your business faces. Then rapidly bringing them to life.',
      'That’s the ustwo way.'
    ]
  },
  process: [{
    name: 'discovery',
    title: 'Discovery & Strategy',
    image: '/images/illustration-discovery.svg',
    text: 'Innovate and get ahead. Define your business goals and validate opportunities with fresh understanding of what your customers need most.'
  },{
    name: 'design',
    title: 'Design & Build',
    image: '/images/illustration-design-and-build.svg',
    text: 'Turn your vision into reality. Exceptional software development, engineering and execution sets your company apart.'
  },{
    name: 'launch',
    title: 'Launch & Scale',
    image: '/images/illustration-launch-and-scale.svg',
    text: "Ship your product and stay responsive to customers’ changing needs. Your product is out in the world: it's time to grow, evolve and deliver ROI."
  },{
    name: 'working',
    title: 'Ways of Working',
    image: '/images/illustration-ways-of-working.svg',
    text: 'Make products that really mean something to your customers. Our teams bake transformative ways of working into your business along the way.'
  }],
  verticals: [{
    type: 'Expertise',
    shortTitle: 'auto',
    title: 'Auto',
    text: 'The ustwo Auto team explore user experience in the automotive space with client engagements and our own research and experimental projects, building services and products around the connected car.',
    slug: '/work/ustwoauto'
  },{
    type: 'Expertise',
    shortTitle: 'health',
    title: 'Health',
    text: 'ustwo collaborates with clients, healthcare professionals and academic experts to create lasting, meaningful digital health solutions.',
    slug: '/work/ustwo-health'
  }],
  clients: ['Adidas', 'Android', 'BMW Group', 'Co-op', 'Ford', 'Foursquare', 'Google', 'Ikea', 'NBC', 'Qantas', 'Sky', 'Sony']
}

const featuredCaseStudy = {
  title: 'Ford GoPark',
  excerpt: 'A smart parking service tackling congestion in one of London’s busiest boroughs',
  colours: ['#87e283', '#92e9b2'],
  image: '/images/work/featured-gopark.png',
  imageAlt: 'iPhone showing Ford GoPark App',
  slug: '/work/ford-gopark'
}
