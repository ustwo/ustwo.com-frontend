import React, { Component } from 'react';
import env from 'app/adaptors/server/env';

import Hero from 'app/components/hero';
import Video from 'app/components/video';

import SVG from 'app/components/svg';
import window from 'app/adaptors/server/window';

class AboutHero extends Component {

  openVideoOverlay(e) {
    e.stopPropagation();
    let src;
    if (window.innerWidth < 600) {
      src = 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=164';
    } else {
      src = 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=165';
    }
    Flux.showVideoOverlay(src);
  }

  render() {
    const { isMobile, fixedHeight, scrollProgress } = this.props;

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
          eventLabel='About'
          video={video}
          fixedHeight={fixedHeight}
          isMobile={isMobile}
          scrollProgress={scrollProgress}
        >
          <button onClick={this.openVideoOverlay} className="about-video-link">
            <div className="section-title">How we work</div>
            <div className="about-video-link-play"><SVG spritemapID="iconPlay" /></div>
          </button>
        </Hero>
      </div>
    )
  }
}

export default AboutHero;
