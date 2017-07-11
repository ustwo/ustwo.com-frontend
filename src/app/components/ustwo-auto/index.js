import React from 'react';
import window from 'app/adaptors/server/window';
import { get } from 'lodash';

import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';
import ContactBlockAuto from 'app/components/contact-block-auto';
import ContactButton from 'app/components/contact-button';
import Footer from 'app/components/footer';
import WorkProcess from 'app/components/work-process';
import FeaturedCaseStudy from 'app/components/featured-case-study';
import TestimonialCarousel from 'app/components/testimonial-carousel';
import WorkCaseStudies from 'app/components/work-case-studies';
import WorkClientsBoard from 'app/components/work-clients-board';
import WorkVerticals from 'app/components/work-verticals';

function UstwoAuto({ page, documentScrollPosition, viewportDimensions, footer, studios, currentPage, isMobile, fixedHeight, scrollProgress }) {

  let styles;
  if (documentScrollPosition > window.innerHeight + 100) {
    styles = { position: `relative` }
  }

  const renderTestimonials = ustwoAutoData.testimonials.length > 0
    ? <TestimonialCarousel testimonials={ustwoAutoData.testimonials} fixedHeight={fixedHeight} />
    : null;

  const renderTwitter = ustwoAutoData.twitter.length > 0
    ? <TestimonialCarousel testimonials={ustwoAutoData.twitter} fixedHeight={fixedHeight} style="twitter-auto" />
    : null;

  const caseStudies = get(page, '_embedded.ustwo:case_studies', []);

  return (
    <div className="work-ustwo-auto">

      <div className="home-pinned-header-wrapper">
        <div className="home-pinned-header-inner" style={styles}>
          <ScrollWrapper
            component={
              <Hero
                title="auto"
                transitionImage={true}
                showDownIndicator={true}
                eventLabel=''
                fixedHeight={fixedHeight}
                isMobile={isMobile}
                scrollProgress={scrollProgress}
                heroImage={true}
              />
            }
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
          />
        </div>
      </div>

      <div className="home-main-content-wrapper">

        <div className="work-whatwedo-wrapper">
          <div className="work-whatwedo">
            <div className="work-intro">
              <p className="work-intro-statement">
                {ustwoAutoData.intro}
              </p>
            </div>
          </div>

          <WorkProcess data={ustwoAutoData.items} isMobile={isMobile}  />

        </div>

        <FeaturedCaseStudy content={ustwoAutoData.latestPromo} />

        <div className="ustwo-auto-team">
          <div className="ustwo-auto-team-inner">

            <h4>Meet the Team</h4>

            <ul className="ustwo-auto-team-profiles">
              <li>
                <section className="profile">
                  <div className="profile-photo"><img src="/images/auto/tim-smith.png" /></div>
                  <h3 className="profile-name">Tim Smith</h3>
                  <p className="profile-title">Visual Design & UI</p>
                  <p className="profile-contact">@mypoorbrain</p>
                </section>
              </li>
              <li>
                <section className="profile">
                  <div className="profile-photo"><img src="/images/auto/tim-smith.png" /></div>
                  <h3 className="profile-name">Tim Smith</h3>
                  <p className="profile-title">Visual Design & UI</p>
                  <p className="profile-contact">@mypoorbrain</p>
                </section>
              </li>
              <li>
                <section className="profile">
                  <div className="profile-photo"><img src="/images/auto/tim-smith.png" /></div>
                  <h3 className="profile-name">Tim Smith</h3>
                  <p className="profile-title">Visual Design & UI</p>
                  <p className="profile-contact">@mypoorbrain</p>
                </section>
              </li>
              <li>
                <section className="profile">
                  <div className="profile-photo"><img src="/images/auto/tim-smith.png" /></div>
                  <h3 className="profile-name">Tim Smith</h3>
                  <p className="profile-title">Visual Design & UI</p>
                  <p className="profile-contact">@mypoorbrain</p>
                </section>
              </li>
            </ul>

          </div>
        </div>

        {renderTestimonials}

        <WorkCaseStudies
          caseStudies={caseStudies}
          page={page}
          numberOfCaseStudiesShowing="12"
          caseStudyFilter="all"
        />

        <WorkClientsBoard logos={ustwoAutoData.partners} title="Our Partners" />

        <WorkVerticals data={ustwoAutoData.projects} />

        {renderTwitter}

        <ScrollWrapper
          component={<ContactBlockAuto />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          requireScreenPosition={true}
          className="scroll-wrapper-contact-block"
        />
        <Footer data={footer} studios={studios} currentPage={currentPage}/>

      </div>

    </div>
  );
}

export default UstwoAuto;

const ustwoAutoData = {
  intro: 'ustwo Auto is dedicated to exploring user experience challenges and opportunities in the mobility space. We work with selected clients and conduct research and experiments, often in collaboration with academic partners around the world. Recent projects and experiments have focussed on these areas:',
  items: [{
    name: 'smart-mobility',
    title: 'Smart Mobility',
    image: '/images/auto/smart-mobility.svg',
    text: 'Creating new services to help people navigate the world more easily'
  },{
    name: 'connected-car',
    title: 'Connected Car',
    image: '/images/auto/connected-car.svg',
    text: 'Enhancing the ownership experience by connecting the car to people’s lifestyles and expectations'
  },{
    name: 'contextual-hmi',
    title: 'Contextual HMI',
    image: '/images/auto/contextual-hmi.svg',
    text: 'Making the in-car experience more personal and situational'
  },{
    name: 'humanising-autonomy',
    title: 'Humanising Autonomy',
    image: '/images/auto/humanising-autonomy.svg',
    text: 'Looking beyond the technology and focussing on new human behaviours and opportunities'
  }],
  latestPromo: {
    title: 'New Promo Title Here',
    excerpt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
    colours: ['#F8E467', '#FFBF02'],
    link: '/',
    linkText: 'Link text',
    latest: true
  },
  testimonials: [{
      testimonial: "The automotive eBook is a rarity, it's wonderful.",
      source: {
        name: 'Apple Design Team',
        title: 'San Francisco',
        company: ''
      }
  },{
      testimonial: "Dogs driving cars is an edge case",
      source: {
        name: 'Tim Smith',
        title: 'ustwo',
        company: ''
      }
  }],
  twitter: [{
      testimonial: "Electric vehicles are quiet and sneaky. For safety, NHTSA suggest all Ev's should make a sound. But what? We explore",
      source: {
        name: '@ustwoauto',
        title: 'Apr 3 2017',
        company: ''
      }
  }],
  partners: ['BMW Group', 'Ford', 'Qantas'],
  projects: [{
    type: 'Research Project',
    shortTitle: 'auto-hmi',
    title: 'ARE WE THERE YET? THOUGHTS ON IN-CAR HMI',
    text: 'In this five part blog series ustwo Auto look into this phenomenon of growing in-car HMI complexity.',
    linkURI: '/work/ustwoauto'
  },{
    type: 'Research Project',
    shortTitle: 'auto-mobility',
    title: 'CITIES SHOW US THE WAY',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.',
    linkURI: '/work/ustwoauto',
    small: true
  },{
    type: 'Research Project',
    shortTitle: 'auto-reimagine',
    title: 'USTWO REIMAGINE THE IN-CAR CLUSTER',
    text: 'Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.',
    linkURI: '/work/ustwoauto',
    small: true
  }]
}
