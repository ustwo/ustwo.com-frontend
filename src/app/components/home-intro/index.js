import React, { Component } from 'react';
import env from 'app/adaptors/server/env';
import window from 'app/adaptors/server/window';

import SVG from 'app/components/svg';
import Video from 'app/components/video';
import DownIndicator from 'app/components/down-indicator';

function renderLogoBackground(screenPosition) {
  const { coordinateX, coordinateY } = screenPosition;
  const modifier = env.Modernizr.touchevents ? 20 : 10;
  const x = (env.Modernizr.touchevents ? coordinateX : coordinateX * -1) || 0;
  const y = (env.Modernizr.touchevents ? coordinateY : coordinateY * -1) || 0;
  const transform = `translate3d(${x * modifier}px, ${y * modifier}px, 0)`;
  const styles = { transform, fill: '#000000' };

  return (
    <SVG
      title="ustwo logo layer"
      className="layer-background"
      spritemapID="ustwologo"
      style={styles}
      viewBox="0 0 112 32"
    />
  );
}

class HomeIntro extends Component {
  render() {
    const { scrollProgress, screenPosition, isMobile, fixedHeight } = this.props;

    const scrollProgressValue = scrollProgress ? scrollProgress : 0;

    const transform = `translateY(${Math.min(((0.5 - scrollProgressValue) * 4) * 30, 0)}px)`;
    const transitionStyles = {
      opacity: (0.75 - scrollProgressValue) * 4,
      transform: transform
    };

    const videoTransitionStyles = {
      transform: transform
    }

    const styles = env.Modernizr.touchevents ? { height: `${fixedHeight}px` } : null;

    let src, srcHls, imageCSS;
    if (window.innerWidth < 600) {
      src = 'https://player.vimeo.com/external/205373063.sd.mp4?s=eedf82905ed3ecba67b0f7ce3d2200309156ee36&profile_id=164';
      srcHls = 'https://player.vimeo.com/external/205373063.m3u8?s=0e6d93219da73e1718daf8837cc53ace9993f0dd';
      imageCSS = 'https://i.vimeocdn.com/video/626259622.jpg?mw=700&mh=1239';
    } else {
      src = 'https://player.vimeo.com/external/195475311.sd.mp4?s=fea332405de6ad2bea1d9082ea6b98184269111e&profile_id=165';
      srcHls = 'https://player.vimeo.com/external/195475311.m3u8?s=9e47d80c47468a648848ede7ad04f873afd5a03e';
      imageCSS = 'https://i.vimeocdn.com/video/626251677.jpg?mw=1280&mh=720';
    }

    return (
      <div className="home-intro" style={styles}>
        <div className="home-intro-video" style={videoTransitionStyles}>
          <Video
            src={src}
            srcHls={srcHls}
            imageCSS={imageCSS}
            heroVideo={true}
            isMobile={isMobile}
            preload="auto"
            fixedHeight={fixedHeight}
          />
        </div>
        <div className="home-intro-logo" style={transitionStyles}>
          <div className="home-intro-logo-wrapper">
            {renderLogoBackground(screenPosition)}
            <SVG
              title="ustwo logo layer"
              spritemapID="ustwologo"
              viewBox="0 0 112 32"
            />
          </div>
        </div>
        <h1 style={transitionStyles}>Digital Products, <br />services &amp; businesses</h1>
        <div className="hero-down-indicator" style={transitionStyles}>
          <DownIndicator />
        </div>
      </div>
    );
  }
}

export default HomeIntro;
