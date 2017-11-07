import React from 'react';
import window from 'app/adaptors/server/window';
import { get } from 'lodash';
import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';
import ContactBlock from 'app/components/contact-block';
import ContactButton from 'app/components/contact-button';
import Footer from 'app/components/footer';
import FeaturedCaseStudy from 'app/components/featured-case-study';
import TestimonialCarousel from 'app/components/testimonial-carousel';
import WorkCaseStudies from 'app/components/work-case-studies';
import WorkClientsBoard from 'app/components/work-clients-board';
import WorkVerticals from 'app/components/work-verticals';
import VideoBlock from 'app/components/video-block';
import RelatedPosts from 'app/components/related-posts';
import Video from 'app/components/video';
import SubContentSections from 'app/components/sub-content-sections';
import GradientWords from 'app/components/gradient-words';
import TwitterCarousel from 'app/components/twitter-carousel';

function Auto({ page, documentScrollPosition, viewportDimensions, footer, studios, currentPage, isMobile, fixedHeight, scrollProgress }) {

  let styles;
  if (documentScrollPosition > window.innerHeight + 100) {
    styles = { position: `relative` }
  }

  const renderTestimonials = autoData.testimonials.length > 0
    ? <TestimonialCarousel testimonials={autoData.testimonials} fixedHeight={fixedHeight} />
    : null;

  const relatedPosts = get(page, '_embedded.ustwo:related_post', []);

  const video = (
    <Video
      src="https://player.vimeo.com/external/233813909.sd.mp4?s=618cf0486ee0a0f5b972f352421f7f36a27beca8&profile_id=165"
      srcHls="https://player.vimeo.com/external/233813909.m3u8?s=499e857388b87b02fdce6b73c17b30218eb1f17b"
      imageCSS="https://i.vimeocdn.com/video/658495896.jpg?mw=1280&mh=720"
      preload="auto"
      fixedHeight={fixedHeight}
    />
  );

  let additionalVideoSrc;
  if (window.innerWidth < 600) {
    additionalVideoSrc = 'https://player.vimeo.com/external/230365343.sd.mp4?s=dd1580c0465d3ad4b8361916a217276b255a921c&profile_id=164';
  } else {
    additionalVideoSrc = 'https://player.vimeo.com/external/230365343.sd.mp4?s=dd1580c0465d3ad4b8361916a217276b255a921c&profile_id=165';
  }
  const additionalVideoPoster = 'https://i.vimeocdn.com/video/652407905.jpg?mw=960&mh=540';

  const renderTwitter = <TwitterCarousel fixedHeight={fixedHeight} type="twitter-auto" />

  return (
    <div className="page-auto">

      <div className="home-pinned-header-wrapper">
        <div className="home-pinned-header-inner" style={styles}>
          <ScrollWrapper
            component={
              <Hero
                title={autoData.title}
                subheading={autoData.subtitle}
                transitionImage={true}
                showDownIndicator={true}
                eventLabel=''
                fixedHeight={fixedHeight}
                isMobile={isMobile}
                scrollProgress={scrollProgress}
                heroImage={true}
                video={video}
              />
            }
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
          />
        </div>
      </div>

      <div className="home-main-content-wrapper">

        <div className="auto-whatwedo">
          <div className="wrapper">
            <h1>
              <span>We make a </span><GradientWords
                word="positive"
                color="auto2"
              /><span>&nbsp;</span><GradientWords
                word="impact"
                color="auto2"
              /><span> on the way businesses, people and cities </span><GradientWords
                word="move"
                color="auto2"
              />
          </h1>
          </div>
        </div>

        <FeaturedCaseStudy content={autoData.latestPromo} />

        <div className="auto-logos-wrapper-clients">
          <WorkClientsBoard logos={autoData.clients} title="Our Clients" />
        </div>

        <FeaturedCaseStudy content={featuredCaseStudy} />

        {renderTestimonials}

        <div className="auto-whatwedo work-whatwedo-wrapper">
          {autoData.workProcess ? <SubContentSections data={autoData.workProcess} isMobile={isMobile}  /> : null}
        </div>

        <RelatedPosts page={page} posts={relatedPosts} />

        <div className="auto-logos-wrapper-partners">
          <WorkClientsBoard logos={autoData.partners} title="Our Partners" />
        </div>

        {renderTwitter}

        <ScrollWrapper
          component={<ContactBlock auto />}
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

export default Auto;

const autoData = {
  title: 'Auto & Mobility',
  subtitle: 'For the journey',
  intro: "From the dashboard, through the city, to the sky, we make a positive impact on the way businesses, people, and cities move.",
  workProcess: [{
    name: 'humanising-autonomy',
    title: 'Humanising Autonomy',
    image: '/images/auto/humanising-autonomy.svg',
    text: 'Conducting experimental research to uncover needs and opportunities for the design of future mobility experiences.'
  },{
    name: 'smart-mobility',
    title: 'Smarter Mobility',
    image: '/images/auto/smart-mobility.svg',
    text: 'Creating new services that improve the way people and things get around.'
  },{
    name: 'connected-car',
    title: 'Connecting the Car',
    image: '/images/auto/connected-car.svg',
    text: "Harnessing the potential that a connected experience can bring to people’s life."
  },{
    name: 'contextual-hmi',
    title: 'Contextual HMI',
    image: '/images/auto/contextual-hmi.svg',
    text: 'Making interfaces within transport more user friendly, personal and situational.'
  },],
  latestPromo: {
    title: 'Download our new Book',
    excerpt: 'In our latest book, we explore creating a human approach to autonomy that actually works.',
    slug: '/auto/humanisingautonomy',
    linkText: 'Find out more',
    latest: true,
    image: '/images/auto/humanising-autonomy-bg.jpg',
    imageBackground: true,
    additionalImage: '/images/auto/humanising-autonomy-book.png',
    className: 'feature-humanising-autonomy'
  },
  howWeDoIt: [
    "Our design methodology is inclusive and from the ground up because we know this creates a better experience for everyone.",
    "We have a collaborative way of working and partnership mindset. This often involves bringing experts together across many disciplines to solve a common problem, whether designers, anthropologists, scientists, engineers, mobility providers, manufacturers, policy makers, city operators or academic and research partners.",
    "Clients work with us to help them build new capabilities and sometimes change the status quo."
  ],
  teamProfile: "We're a community of designers, inventors and engineers. We don't make cars but we have a small collection. We conduct our own research experiments because we’re passionate about what we do and want to solve the problems we see around us. We’re embedded within ustwo with over 50 of us across our studios globally with specific sector expertise.",
  testimonials: [{
    testimonial: "There was a recognition that we were attempting to do something that had never been done before. There was no pre-existing capability so that prompted us to work with ustwo.",
    source: {
      name: 'Doug Nicoll',
      title: 'Ford Smart Mobility, London',
      company: ''
    }
  },{
    testimonial: "I know a lot of design agencies but they are the best. They have the best design skills; a great working style and the team are really smart",
    source: {
      name: 'Shusuke Miyazawa',
      title: 'Nissan, Tokyo',
      company: ''
    }
  },{
    testimonial: "The automotive eBook is a rarity, it's wonderful.",
    source: {
      name: 'Apple Design Team',
      title: 'San Francisco',
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
    testimonial: "Brilliant car UI from [the ustwo] geniuses",
    source: {
      name: 'Wired',
      title: '',
      company: ''
    }
  },{
    testimonial: "Ustwo has a new idea to reinvent the instrument cluster in cars, one that creates a beautiful and more immediately readable presentation",
    source: {
      name: 'John Wenz',
      title: 'Popular Mechanics',
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
  clients: ['Ford', 'Qantas', 'TFL', 'Skanetrafiken', 'JLR', 'Nissan', 'Toyota', 'Alphabet', 'BMW Group'],
  partners: ['UCL', 'University of Washington', 'Wayfindr', 'Car Design Research', 'Royal Society for Blind Children']
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
