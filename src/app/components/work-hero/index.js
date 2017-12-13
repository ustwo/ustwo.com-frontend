import React, { Component } from 'react';
import Hero from 'app/components/hero';
import Video from 'app/components/video';

function WorkHero({ isMobile, fixedHeight, scrollProgress }) {
  const video = (
    <Video
      src="https://player.vimeo.com/external/209403984.sd.mp4?s=fa5d1e9fcb9e3f78d55423329a605fc7db82541f&profile_id=165"
      srcHls="https://player.vimeo.com/external/209403984.m3u8?s=65a57e0454227df1838a1372f99bf7d761aad830"
      imageCSS="https://i.vimeocdn.com/video/624938224.jpg?mw=1280&mh=720"
      preload="auto"
      fixedHeight={fixedHeight}
    />
  );

  return (
    <div className="about-hero">
      <Hero
        title="WE DESIGN AND DELIVER DIGITAL PRODUCTS AND SERVICES THAT CREATE MEANINGFUL IMPACT"
        transitionImage={true}
        showDownIndicator={true}
        eventLabel='TOGETHER IN PARTNERSHIP'
        video={video}
        fixedHeight={fixedHeight}
        isMobile={isMobile}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}

export default WorkHero;
