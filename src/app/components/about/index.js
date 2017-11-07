import React, { Component } from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';
import AboutHero from 'app/components/about-hero';
import ContactButton from 'app/components/contact-button';
import SubContentSections from 'app/components/sub-content-sections';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';

class About extends Component {
  renderWhatWeDo() {
    const { isMobile } = this.props;
    const aboutIntroExtra = aboutContent.intro.extra.map((item, i) => <p className="work-intro-extra" key={`work-para-${i}`}>{item}</p>);

    return (
      <div className="work-whatwedo-wrapper">
        <div className="work-whatwedo">
          <div className="work-intro">
            <p className="work-intro-statement">{aboutContent.intro.statement}</p>
            {aboutIntroExtra}
          </div>
        </div>
        <SubContentSections data={aboutContent.process} isMobile={isMobile} />
        <div className="work-contact">
          <ContactButton />
        </div>
      </div>
    );
  }

  render() {
    const { page, className, loaded, isMobile, footer, studios, currentPage, fixedHeight, documentScrollPosition, viewportDimensions, popup, modal } = this.props;
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

          {this.renderWhatWeDo()}

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
}

export default About;

const aboutContent = {
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
