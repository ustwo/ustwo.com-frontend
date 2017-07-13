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
                title={ustwoAutoData.title}
                subheading={ustwoAutoData.subtitle}
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
              <p className="work-intro-further">
                {ustwoAutoData.introFurther}
              </p>
            </div>
          </div>

          <WorkProcess data={ustwoAutoData.items} isMobile={isMobile}  />

        </div>

        <FeaturedCaseStudy content={ustwoAutoData.latestPromo} />

        <div className="ustwo-auto-team">
          <div className="ustwo-auto-team-inner">

            <h2>Meet the Team</h2>

            <p>{ustwoAutoData.teamProfile}</p>

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

        <div className="ustwo-auto-logos-wrapper">
          <WorkClientsBoard logos={ustwoAutoData.clients} title="Our Clients" />
          <WorkClientsBoard logos={ustwoAutoData.partners} title="Our Partners" />
        </div>

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
  title: 'auto',
  subtitle: 'For the journey',
  intro: 'What drives us? The world is full of broken journeys. We’re on a mission to create a more seamless and magically connected experience.',
  introFurther: 'We research how people travel to create services that transform our everyday lives. To do this we collaborate with designers, anthropologists, scientists, engineers, mobility providers, manufacturers, policy makers, city operators and academic and research partners around the world.',
  items: [{
    name: 'humanising-autonomy',
    title: 'Humanising Autonomy',
    image: '/images/auto/humanising-autonomy.svg',
    text: 'Conducting experimental research to uncover needs and opportunities for the design of future mobility experiences.'
  },{
    name: 'smart-mobility',
    title: 'Smarter Mobility',
    image: '/images/auto/smart-mobility.svg',
    text: 'Creating new services that improve the way people travel.'
  },{
    name: 'connected-car',
    title: 'Connecting the Car',
    image: '/images/auto/connected-car.svg',
    text: 'Harnessing the potential that a connected experience can bring to people’s life.'
  },{
    name: 'contextual-hmi',
    title: 'Contextual HMI',
    image: '/images/auto/contextual-hmi.svg',
    text: 'Making interfaces within transport more personal and situational.'
  },],
  latestPromo: {
    title: 'New Promo Title Here',
    excerpt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
    colours: ['#F8E467', '#FFBF02'],
    link: '/',
    linkText: 'Link text',
    latest: true
  },
  teamProfile: 'In 2014 we wrote a book on some thoughts around opportunities and failings around designing within the car. Our community has grown from there with over 100 of our designers and engineers globally working on mobility projects and research since then.',
  testimonials: [{
    testimonial: "The automotive eBook is a rarity, it's wonderful.",
    source: {
      name: 'Apple Design Team',
      title: 'San Francisco',
      company: ''
    }
  },{
    testimonial: "There was a recognition that we were attempting to do something that had never been down before. There was no pre-existing capability so that prompted us to work with ustwo.",
    source: {
      name: 'Doug Nicolls',
      title: 'Ford Smart Mobility, London',
      company: ''
    }
  },{
    testimonial: "BS shovelling art schools grads",
    source: {
      name: 'A Jalopnik reader',
      title: '',
      company: ''
    }
  },{
    testimonial: "It speaks volumes that a lot of people got inspired and had new thoughts after your presentation",
    source: {
      name: 'Autonomy design lead, Germany',
      title: '',
      company: ''
    }
  },{
    testimonial: "I know a lot of design agencies but they are the best. They have the best design skills; a great working style and the team are really smart",
    source: {
      name: 'Shusuke Miyazawa',
      title: 'Nissan, Tokyo',
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
  },{
    testimonial: "Another tweet goes here",
    source: {
      name: '@ustwoauto',
      title: 'Feb 11 2017',
      company: ''
    }
  }],
  clients: ['UCL', 'university-washington', 'Wayfindr'],
  partners: ['BMW Group', 'Ford', 'Qantas', 'Emirates', 'TFL', 'Skanetrafiken', 'JLR', 'Nissan'],
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
