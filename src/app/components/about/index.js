import React from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';
import AboutHero from 'app/components/about-hero';
import ContactFloating from 'app/components/contact-floating';
import SubContentSections from 'app/components/sub-content-sections';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';
import ContentWrapper from 'app/components/content-wrapper';

function pageAbout({ page, className, loaded, isMobile, footer, studios, currentPage, fixedHeight, documentScrollPosition, viewportDimensions, popup, modal }) {
  const classes = classnames('page-about', className);

  return (
    <article className={classes}>

      <div className="home-pinned-header-wrapper">
        <div className="home-pinned-header-inner">
          <ScrollWrapper
            component={<AboutHero loaded={loaded} modal={modal} isMobile={isMobile} fixedHeight={fixedHeight} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            requireScreenPosition={true}
            className="scroll-wrapper-work-hero"
          />
        </div>
      </div>

      <div className="home-main-content-wrapper">

        <div className="statement-wrapper">
          <div className="statement-inner">
            <h2>What we do</h2>
            {aboutContent.what.map((item, i) => <p key={`work-para-${i}`}>{item}</p>)}
          </div>
        </div>

        <SubContentSections data={aboutContent.process} isMobile={isMobile} />

        <ContactFloating />

        <div className="statement-wrapper">
          <div className="statement-inner">
            <h2>Who we are</h2>
            {aboutContent.who.map((item, i) => <p key={`work-para-${i}`}>{item}</p>)}
          </div>
        </div>

        <SubContentSections data={aboutContent.studios} isMobile={isMobile} className="subContentStudios" />

        <ContentWrapper className="manifesto-content-wrapper">
          <h2>Manifesto</h2>
          <p>We believe diverse teams help us make better products, so we actively hire for cultural growth, welcoming people of all ages, stories and backgrounds.
          If you want to know more, check out our Manifesto here and some of the roles we’re hiring for across the globe down below. Welcome to the Fampany.</p>
        </ContentWrapper>

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

export default pageAbout;

const aboutContent = {
  what: [
    'We learn through making, then apply everything we know to create game-changing digital products and services for clients.',
    'We always do it collaboratively through expertly coached teamwork. You and us, working together, discovering answers to the biggest questions your business faces - then rapidly bringing them to life.',
    'That’s the ustwo way.'
  ],
  who: [
    'Founded by Mills and Sinx back in 2004, our mission was to build a studio where like-minded, passionate people could work under one roof, share unique ideas and bring them to life.',
    'Whether we’re doing innovative work for clients, bringing our own ideas to award-winning life, or launching disruptive new businesses, ustwo has never done normal. Over the last 12 years we’ve grown, and there are now four unique ustwo studios around the world – in London, New York, Malmö and Sydney.'
  ],
  process: [{
    name: 'discovery',
    title: 'Discovery & Strategy',
    image: '/images/illustration-discovery.svg',
    text: 'Innovate and get ahead. Define your business goals and validate opportunities with fresh understanding of what your customers need most.',
    url: '/work/discovery-strategy'
  },{
    name: 'design',
    title: 'Design & Build',
    image: '/images/illustration-design-and-build.svg',
    text: 'Turn your vision into reality. Exceptional software development, engineering and execution sets your company apart.',
    url: '/work/design-build'
  },{
    name: 'launch',
    title: 'Launch & Scale',
    image: '/images/illustration-launch-and-scale.svg',
    text: "Ship your product and stay responsive to customers’ changing needs. Your product is out in the world: it's time to grow, evolve and deliver ROI.",
    url: '/work/launch-scale'
  },{
    name: 'working',
    title: 'Ways of Working',
    image: '/images/illustration-ways-of-working.svg',
    text: 'Make products that really mean something to your customers. Our teams bake transformative ways of working into your business along the way.',
    url: '/work/ways-of-working'
  }],
  studios: [{
    name: 'london',
    title: 'London',
    image: 'https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/07/Ustwo-website-HQ-36-640x427.jpg',
    text: "Occupying three floors of The Tea Building in Shoreditch, our UK studio has over 100 talented and driven people. We're dedicated to delivering stand-out work for clients including Barclays, Ford, DeepMind, Harvey Nichols, Co-op and Sky. We also develop our own products and businesses, including mental health app Moodnotes, audio-wayfinding service Wayfindr and ticketing app DICE."
  },{
    name: 'malmo',
    title: 'Malmo',
    image: 'https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/05_flexible_bonuses-640x356.jpg',
    text: "With bright and shiny spaces on ‘Love Street’ in the heart of Malmö, our Nordic studio is a warren of creativity and strategic thinking. We’re proud to count major brands among those who rely on our skills and services. ustwo Nordics is also the birthplace of a couple of our many successful inventions like Rando and PAUSE."
  },{
    name: 'new-york',
    title: 'New York',
    image: 'https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/07/event-space-mural-640x480.jpg',
    text: "Light-filled with sweeping panoramic views, our New York studio sits sixteen stories high in the historic Standard Oil building nestled in the center of Manhattan's bustling Financial District. Here our designers, strategists, and developers from around the world collaborate closely with each other and with our clients, who range from America's best-known brands to young, scrappy startups. We're also proud founding partners of Pledge Parental Leave."
  },{
    name: 'sydney',
    title: 'Sydney',
    image: 'https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/07/superheroes1-640x427.jpg',
    text: "Leading the charge for ustwo's southern-most chapter, our newest studio is located in the heart of Surry Hills, Sydney. Bringing together a team from across the world, spearheaded by local knowledge, we opened the 'austwo' doors for business in January 2015."
  }]
}
