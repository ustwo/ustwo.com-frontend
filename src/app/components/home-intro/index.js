import React, { Component } from 'react';
import transitionOnScroll from 'app/lib/transition-on-scroll';
import env from 'app/adaptors/server/env';
import window from 'app/adaptors/server/window';

import SVG from 'app/components/svg';
import Video from 'app/components/video';
import DownIndicator from 'app/components/down-indicator';

// const rainbowColours = ['#ED0082', '#E60C29', '#FF5519', '#FFBF02', '#96CC29', '#14C04D', '#16D6D9', '#009CF3', '#143FCC', '#6114CC', '#111111'];

function renderLogoBackground(screenPosition) {
  const { coordinateX, coordinateY } = screenPosition;
  const modifier = env.Modernizr.touchevents ? 20 : 10;
  let x = env.Modernizr.touchevents ? coordinateX : coordinateX * -1;
  let y = env.Modernizr.touchevents ? coordinateY : coordinateY * -1;
  x = x || 0;
  y = y || 0;
  const value = 10 + Math.abs(coordinateX * 10);
  const transform = `translate3d(${x * modifier}px, ${y * modifier}px, 0)`;
  const styles = { transform, fill: '#000000' }
  // const translateZ = `-${value}px`;

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
    const { scrollProgress, screenPosition, loaded, isMobile, popup, viewportDimensions, currentPage, studios, footer, fixedHeight } = this.props;

    let playVideo = loaded;
    if (scrollProgress > 0.5 && env.Modernizr.touchevents || !!popup) {
      playVideo = false;
    }

    const hide = scrollProgress === 1;

    let fallbackImage, src;
    if (window.innerWidth < 600) {
      src = 'https://player.vimeo.com/external/205373063.sd.mp4?s=eedf82905ed3ecba67b0f7ce3d2200309156ee36&profile_id=165';
      // TODO: remove this and the file
      // src = '/images/home/home-mobile.mp4';
      fallbackImage = '/images/home-header-fallback-mobile.jpg';
    } else {
      src = 'https://player.vimeo.com/external/195475311.sd.mp4?s=fea332405de6ad2bea1d9082ea6b98184269111e&profile_id=165';
      // src = '/images/home/home.mp4';
      fallbackImage = '/images/home-header-fallback.jpg';
    }

    const transform = `translateY(${((0.5 - scrollProgress) * 4) * 30}px)`;
    const transitionStyles = {
      opacity: (0.75 - scrollProgress) * 4,
      transform: transform
    };

    const videoTransitionStyles = {
      transform: transform
    }

    let styles;
    if (env.Modernizr.touchevents) {
      styles = { height: `${fixedHeight}px` }
    }

    return (
      <div className="home-intro" style={styles}>
        <div className="home-intro-video" style={videoTransitionStyles}>
          <Video
            src={src}
            isVideoBackground={true}
            play={playVideo}
            imageCSS={fallbackImage}
            heroVideo={true}
            isMobile={isMobile}
            preload="auto"
            fixedHeight={fixedHeight}
            hide={hide}
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
        <div className="hero-down-indicator" style={transitionStyles}><DownIndicator /></div>
      </div>
    );
  }
}

export default HomeIntro;
