import React from 'react';
import Hero from 'app/components/hero';
import PaperPlane from 'app/components/paper-plane';

function HeroNoVideo({ pageName, fixedHeight, isMobile, scrollProgress, title, screenPosition }) {
  let contactUsHeroPlane;
  if (pageName === 'contact-us') {
    contactUsHeroPlane = (
      <PaperPlane screenPosition={screenPosition} contactUsPlane />
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
      />
      {contactUsHeroPlane}
    </div>
  );
}

export default HeroNoVideo;
