import React from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';
import AboutHero from 'app/components/about-hero';
import ContactFloating from 'app/components/contact-floating';
import SubContentSections from 'app/components/sub-content-sections';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';
import ContentWrapper from 'app/components/content-wrapper';
import VideoBlock from 'app/components/video-block';
import window from 'app/adaptors/server/window';
import StudioBlock from 'app/components/studio-block';

function renderStudioBlocks(studios) {
  return studios.map((studio, i) => {
    const alignment = i % 2 ? 'left' : 'right';

    return (
      <StudioBlock studio={studio} align={alignment} />
    );
  });
}

function pageAboutUs({ page, className, loaded, isMobile, footer, studios, currentPage, fixedHeight, documentScrollPosition, viewportDimensions, popup, modal }) {
  const classes = classnames('page-about-us', className);
  const videoPoster = '/images/ustwo-roadshow-first-frame.jpg';
  let videoSrc;
  if (window.innerWidth < 600) {
    videoSrc= 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=164';
  } else {
    videoSrc= 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=165';
  }

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

        <ContentWrapper className="content-wrapper-about-intro">
          <div className="content-wrapper-statement">
            <h2>What we do</h2>
            <hr className="hr hr-about" />
            {aboutContent.what.map((item, i) => <p key={`work-para-${i}`}>{item}</p>)}
          </div>
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-about-video">
          <VideoBlock videoPoster={videoPoster} src={videoSrc} />
        </ContentWrapper>

        <SubContentSections data={aboutContent.process} isMobile={isMobile} className="content-wrapper-about-sections" />

        <ContactFloating buttonFlavour="about" />

        <ContentWrapper className="content-wrapper-who">
          <div className="content-wrapper-statement">
            <h2>Who we are</h2>
            <hr className="hr hr-about" />
            {aboutContent.who.map((item, i) => <p key={`work-para-${i}`}>{item}</p>)}
          </div>
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-studios">
          {renderStudioBlocks(studios)}
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-manifesto">
          <div className="content-wrapper-statement">
            <h2>Manifesto</h2>
            <hr className="hr hr-about" />
            <p>We believe diverse teams help us make better products, so we actively hire for cultural growth, welcoming people of all ages, stories and backgrounds.
            If you want to know more, check out our Manifesto here and some of the roles we’re hiring for across the globe down below. Welcome to the Fampany.</p>
            <a href="http://us2.co/ManifestoV2">Read our Manifesto</a>
          </div>
        </ContentWrapper>

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

export default pageAboutUs;

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
  }]
}
