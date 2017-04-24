import React, { Component } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import getFeaturedImage from 'app/lib/get-featured-image';
import env from 'app/adaptors/server/env';
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';

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
import WorkClientsBoard from 'app/components/work-clients-board';
import WorkCaseStudies from 'app/components/work-case-studies';

class PageWork extends Component {

  constructor(props) {
    super(props);

    this.state = {
      caseStudyFilter: 'all',
      numberOfCaseStudiesShowing: 12
    }
  }

  // componentDidMount() {
  //   const box = this.workAnchor.getBoundingClientRect();
  //   const body = document.body;
  //   const scrollTop = window.pageYOffset || body.scrollTop;
  //   const clientTop = body.clientTop || 0;
  //   const top  = box.top +  scrollTop - clientTop;
  //   const workAnchorPosition = Math.round(top);
  //
  //   this.setState({ workAnchorPosition });
  // }

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

  renderFeaturedCaseStudy() {
    const styles = {
      backgroundImage: `linear-gradient(305deg, ${featuredCaseStudy.colours[0]}, ${featuredCaseStudy.colours[1]})`
    }

    return (
      <div className="work-featured-case-study" style={styles}>
        <div className="work-featured-case-study-inner">
          <div className="work-featured-case-study-image">
            <img src={featuredCaseStudy.image} alt={featuredCaseStudy.imageAlt} />
          </div>
          <div className="work-featured-case-study-content">
            <div className="section-title">Featured Work</div>
            <h2 className="title">{featuredCaseStudy.title}</h2>
            <p>{featuredCaseStudy.excerpt}</p>
            <button onClick={Flux.override(featuredCaseStudy.linkURI)}>View Case Study</button>
          </div>
        </div>
      </div>
    )
  }

  addMoreCaseStudies() {
    this.setState({
      numberOfCaseStudiesShowing: this.state.numberOfCaseStudiesShowing + 12
    })
  }

  render() {
    const { page, className, loaded, isMobile, footer, studios, currentPage, fixedHeight, documentScrollPosition, viewportDimensions, popup, modal } = this.props;
    const { isLoadingMorePosts, numberOfCaseStudiesShowing, caseStudyFilter } = this.state;
    const caseStudies = get(page, '_embedded.ustwo:case_studies', []);
    const image = getFeaturedImage(page);
    const classes = classnames('page-work', className);
    const buttonClassAll = classnames({ selected: this.state.caseStudyFilter === 'all' });
    const buttonClassClients = classnames({ selected: this.state.caseStudyFilter === 'Client Work' });
    const buttonClassVentures = classnames({ selected: this.state.caseStudyFilter === 'Venture' });

    let styles;
    if (documentScrollPosition > window.innerHeight + 100) {
      styles = { position: `relative` }
    }

    return (
      <article className={classes}>

        <div className="home-pinned-header-wrapper">
          <div className="home-pinned-header-inner" style={styles}>
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

          {this.renderFeaturedCaseStudy()}

          <div className="page-work-controls" ref={(ref) => this.workAnchor = ref}>
            <div className="page-work-filter">
              <button className={buttonClassAll} onClick={() => this.setState({ caseStudyFilter: 'all', numberOfCaseStudiesShowing: 12 })}>All</button>
              <button className={buttonClassClients} onClick={() => this.setState({ caseStudyFilter: 'Client Work', numberOfCaseStudiesShowing: 12 })}>Client Work</button>
              <button className={buttonClassVentures} onClick={() => this.setState({ caseStudyFilter: 'Venture', numberOfCaseStudiesShowing: 12 })}>Ventures</button>
            </div>
          </div>

          <WorkCaseStudies caseStudies={caseStudies} page={page} numberOfCaseStudiesShowing={numberOfCaseStudiesShowing} caseStudyFilter={caseStudyFilter} addMoreCaseStudies={this.addMoreCaseStudies.bind(this)} />

          <WorkVerticals data={workData.verticals} />

          <WorkClientsBoard />

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
  verticals: {
    auto: {
      type: 'Expertise',
      title: 'Auto',
      text: 'The ustwo Auto team explore user experience in the automotive space with client engagements and our own research and experimental projects, building services and products around the connected car.',
      linkURI: '/work/ustwoauto'
    },
    health: {
      type: 'Expertise',
      title: 'Health',
      text: 'ustwo collaborates with clients, healthcare professionals and academic experts to create lasting, meaningful digital health solutions.',
      linkURI: '/work/ustwo-health'
    }
  }
}

const featuredCaseStudy = {
  title: 'Ford GoPark',
  excerpt: 'A smart parking service tackling congestion in one of London’s busiest boroughs',
  colours: ['#87e283', '#92e9b2'],
  image: '/images/work/featured-gopark.png',
  imageAlt: 'iPhone showing Ford GoPark App',
  linkURI: '/work/ford-gopark'
}
