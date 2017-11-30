import React, { Component } from 'react';
import Hero from 'app/components/hero';
import Video from 'app/components/video';

function AboutHero({ isMobile, fixedHeight, scrollProgress }) {
  const video = (
    <Video
      src="https://player.vimeo.com/external/244195245.sd.mp4?s=60fb55490a9662039ae0b807dba6ba034aa5b691&profile_id=165"
      srcHls="https://player.vimeo.com/external/244195245.m3u8?s=19424df3fdf41b97c874d9aa330445261a9667a0"
      imageCSS="https://i.vimeocdn.com/video/668530209.jpg?mw=1280&mh=720"
      preload="auto"
      fixedHeight={fixedHeight}
    />
  );

  return (
    <div className="about-hero">
      <Hero
        title="Make things to change things"
        transitionImage={true}
        showDownIndicator={true}
        eventLabel='About Us'
        video={video}
        fixedHeight={fixedHeight}
        isMobile={isMobile}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}

export default AboutHero;
