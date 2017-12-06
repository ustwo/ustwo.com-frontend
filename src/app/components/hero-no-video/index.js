import React from 'react';
import Hero from 'app/components/hero';
import PaperPlane from 'app/components/paper-plane';

function HeroNoVideo({ pageName, fixedHeight, isMobile, scrollProgress, title, screenPosition, gradientSequence }) {
  const scrollProgressValue = scrollProgress ? scrollProgress : 0;
  const normaliseScrollProgress = ((scrollProgressValue - 0.5) * 2);
  // const scrollUpPlaneUp = `translateY(${(scrollProgressValue * -1200) + 600}px)`;
  const scrollUpPlaneOff = `translate(${normaliseScrollProgress * 600}px, ${normaliseScrollProgress * 70}px)`;
  let transitionStyles;
  if (scrollProgress) {
    transitionStyles = {
      opacity: (1 - scrollProgress) * 4,
      transform: scrollUpPlaneOff
    };
  }

  let contactUsHeroPlane;
  if (pageName === 'contact-us') {
    contactUsHeroPlane = (
      <div className="contact-us-paper-plane" style={transitionStyles}>
        <PaperPlane screenPosition={screenPosition} contactUsPlane />
      </div>
    );
  }

  return (
    <div className={`hero-no-video ${pageName}-hero`}>
      <Hero
        title={title}
        transitionImage={true}
        eventLabel={pageName.replace('-', ' ')}
        showDownIndicator={true}
        fixedHeight={fixedHeight}
        isMobile={isMobile}
        scrollProgress={scrollProgress}
        heroImage={true}
        gradientSequence={gradientSequence}
      />
      {contactUsHeroPlane}
    </div>
  );
}

export default HeroNoVideo;
