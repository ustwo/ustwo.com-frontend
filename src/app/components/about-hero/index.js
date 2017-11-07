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
