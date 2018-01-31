import React from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';
import AboutHero from 'app/components/about-hero';
import ContactFloating from 'app/components/contact-floating';
import JoinUsFloating from 'app/components/join-us-floating';
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
            <p>Founded by Mills and Sinx back in 2004, our mission is to build a studio where like-minded, passionate people can work under one roof, share unique ideas and bring them to life.</p>
            <p>Over the last 13 years we’ve grown, and there are now four unique ustwo studios around the world across London, New York, Malmö and Sydney, in addition to <a href="https://ustwogames.co.uk/">ustwo Games</a>, and <a href="https://adventure.ustwo.com/?ref=ustwo">ustwo Adventure</a>, our startup fund/incubator.</p>
            <p>Whether we’re doing innovative work for clients, bringing our own ideas to award-winning life, or launching disruptive new businesses, ustwo has never done normal.</p>
          </div>
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-manifesto">
          <div className="content-wrapper-statement">
            <h2>Manifesto</h2>
            <hr className="hr hr-about" />
            <p>We believe diverse teams help us make better products, so we actively hire for cultural growth, welcoming people of all ages, stories and backgrounds.
            If you want to know more, check out our Manifesto here and some of the roles we’re hiring for across the globe down below. Welcome to the Fampany.</p>
            <a href="https://usweb-cdn.ustwo.com/ustwo-production/uploads/2017/12/ustwo_cultural_manifesto_dec17.pdf">Read our Manifesto (47Mb)</a>
          </div>
        </ContentWrapper>

        <JoinUsFloating buttonFlavour="join" />

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
    "We work with businesses and organisations of all shapes and sizes, from early-stage startups to the world’s leading brands, to create digital products and services that solve the problems of today as well as define the opportunities of the future.",
    "Through our company builder and accelerator arm, we also develop our own products and invest in ventures – all with the same goal of creating meaningful impact on the world.",
    "Whether it's innovative experiences for clients or launching businesses that redefine and push the boundaries of conventional industries, ustwo is constantly challenging the definition of what it means to be a digital product studio."
  ],
  who: [
    "Founded by Mills and Sinx back in 2004, our mission is to build a studio where like-minded, passionate people can work under one roof, share unique ideas and bring them to life.",
    "Over the last 13 years we’ve grown, and there are now four unique ustwo studios around the world across London, New York, Malmö and Sydney, in addition to ustwo Games, and ustwo Adventures, our startup fund/incubator.",
    "Whether we’re doing innovative work for clients, bringing our own ideas to award-winning life, or launching disruptive new businesses, ustwo has never done normal."
  ],
  process: [{
    name: 'discovery',
    title: 'Discovery & Strategy',
    image: '/images/illustration-discovery.svg',
    text: 'Innovate and get ahead. Define new propositions and validate opportunities with a fresh understanding of what your customers need most.',
    url: '/about-us/discovery-strategy'
  },{
    name: 'design',
    title: 'Design & Delivery',
    image: '/images/illustration-design-and-build.svg',
    text: 'Turn your vision into reality. World-class design is matched with exceptional software development and execution to set your company apart.',
    url: '/about-us/design-build'
  },{
    name: 'launch',
    title: 'Launch & Scale',
    image: '/images/illustration-launch-and-scale.svg',
    text: "Ship your product and stay responsive. Your product is out in the world: it's time to grow, evolve, and adapt to customers’ changing needs.",
    url: '/about-us/launch-scale'
  },{
    name: 'working',
    title: 'Change & Transform',
    image: '/images/illustration-change-and-transform.svg',
    text: 'Build capability through doing. Our teams bake transformative ways of working into your business and teams every step of the way so you can sustain the impact you make.',
    url: '/about-us/change-transform'
  }]
}
