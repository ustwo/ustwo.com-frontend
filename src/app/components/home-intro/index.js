import React, { Component } from 'react';
import transitionOnScroll from 'app/lib/transition-on-scroll';
import env from 'app/adaptors/server/env';
import window from 'app/adaptors/server/window';

import SVG from 'app/components/svg';
import Video from 'app/components/video';
import DownIndicator from 'app/components/down-indicator';

// const rainbowColours = ['#ED0082', '#E60C29', '#FF5519', '#FFBF02', '#96CC29', '#14C04D', '#16D6D9', '#009CF3', '#143FCC', '#6114CC', '#111111'];

function renderLogoBackground(screenPosition, isMobile) {

  const modifier = isMobile ? 20 : 15;
  const modifierTranslate = modifier;
  const modifierRotate = modifier - 5;

  const { coordinateX, coordinateY } = screenPosition;

  let value = 10 + Math.abs(coordinateX * 10);
  let translateZ = `-${value}px`;


  const transform = `translate3d(${coordinateX * modifierTranslate}px, ${coordinateY * modifierTranslate}px, ${translateZ}) rotateY(${coordinateX * modifierRotate}deg) rotateX(${coordinateY * modifierRotate}deg)`;

  let styles = { transform, fill: '#000000' }

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

  constructor(props) {
    super(props);

    this.state = {
      height: this.props.viewportDimensions.height
    }
  }

  render() {
    const { scrollProgress, screenPosition, loaded, isMobile, popup, viewportDimensions, fixedHeightOnLoad } = this.props;

    let playVideo = loaded;
    if (scrollProgress > 0.5 || !!popup) {
      playVideo = false;
    }

    let fallbackImage;
    if (isMobile) {
      fallbackImage = '/images/home-header-fallback-mobile.jpg';
    } else {
      fallbackImage = '/images/home-header-fallback.jpg';
    }

    let src;
    if (window.innerWidth < 600) {
      src= 'https://player.vimeo.com/external/205373063.sd.mp4?s=eedf82905ed3ecba67b0f7ce3d2200309156ee36&profile_id=165';
    } else {
      src= 'https://player.vimeo.com/external/195475311.sd.mp4?s=fea332405de6ad2bea1d9082ea6b98184269111e&profile_id=165';
    }

    const logoStyles = {
      opacity: (0.75 - scrollProgress) * 4,
      transform: `translateY(${((0.5 - scrollProgress) * 4) * 30}px)`
    };

    const styles = {
      height: fixedHeightOnLoad
    }

    return (
      <div className="home-intro" style={styles}>
        <Video
          src={src}
          isVideoBackground={true}
          play={playVideo}
          imageCSS={fallbackImage}
          heroVideo={true}
          isMobile={isMobile}
          preload="metadata"
        />
        <div className="home-intro-logo" style={logoStyles}>
          <div className="home-intro-logo-wrapper">
            {renderLogoBackground(screenPosition, isMobile)}
            <SVG
              title="ustwo logo layer"
              spritemapID="ustwologo"
              viewBox="0 0 112 32"
            />
          </div>
        </div>
        <DownIndicator />
      </div>
    );
  }
}

export default HomeIntro;
