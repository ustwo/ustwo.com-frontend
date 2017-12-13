import React, { Component } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import getFeaturedImage from 'app/lib/get-featured-image';
import env from 'app/adaptors/server/env';
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';
import kebabCase from 'lodash/string/kebabCase';
import ContactFloating from 'app/components/contact-floating';
import TestimonialCarousel from 'app/components/testimonial-carousel';
import Video from 'app/components/video';
import Footer from 'app/components/footer';
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
      caseStudyFilter: 'client-work',
      numberOfCaseStudiesShowing: 12
    }
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
    const filterItems = ['All', 'Client Work', 'Venture', 'Business', 'Own Product'];

    const renderFilterItems = filterItems.map((item, i) => {
      const classes = classnames({ selected: caseStudyFilter === kebabCase(item) });
      return (
        <button
          className={classes}
          onClick={() => this.setState({ caseStudyFilter: kebabCase(item), numberOfCaseStudiesShowing: 12 })}
          key={`filter-item-${i}`}
        >
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

          <WorkClientsBoard logos={workContent.clients} title="ustwo work with" />

          {this.renderTestimonialCarousel()}

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

          <ContactFloating buttonFlavour="work" />

          <WorkVerticals data={workContent.verticals} />

          <ScrollWrapper
            component={<ContactBlock page={page ? page.slug : 'home'} />}
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

const workContent = {
  intro: {
    statement: 'We learn through making. Then apply everything we know to create game-changing digital products and services for clients.',
  },
  verticals: [{
    type: 'Expertise',
    shortTitle: 'auto',
    title: 'Auto & Mobility',
    text: 'On the road, in the city, and up in the sky, we work with clients and partners to imagine and create the products and services for the future of transportation.',
    slug: '/auto'
  },{
    type: 'Expertise',
    shortTitle: 'health',
    title: 'Health',
    text: 'ustwo collaborates with clients, healthcare professionals and academic experts to create lasting, meaningful digital health solutions.',
    slug: '/work/ustwo-health'
  }],
  clients: ['Android', 'Barclays', 'BMW Group', 'Co-op', 'Ford', 'Foursquare', 'Google', 'NBC', 'Nike', 'Qantas', 'Samsung', 'Sky', 'Sony', 'Zara']
}

const featuredCaseStudy = {
  title: 'Ford GoPark',
  excerpt: 'A smart parking service tackling congestion in one of London’s busiest boroughs',
  colours: ['#87e283', '#92e9b2'],
  image: '/images/work/featured-gopark.png',
  imageAlt: 'iPhone showing Ford GoPark App',
  slug: '/work/ford-gopark',
  linkText: 'View Case Study'
}
