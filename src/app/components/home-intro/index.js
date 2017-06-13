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

    return (
      <div className="home-intro" style={styles}>
        <div className="home-intro-video" style={videoTransitionStyles}>
          <Video
            src="https://player.vimeo.com/external/220313743.sd.mp4?s=2c97e3a1adde9cd20562f473d9912d5eb66bac13&profile_id=165"
            srcHls="https://player.vimeo.com/external/220313743.m3u8?s=7d1bf5e408ecc13e5113b543c65165246561b232"
            imageCSS="https://i.vimeocdn.com/video/639084650.jpg?mw=1280&mh=720"
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
        <div className="hero-down-indicator" style={transitionStyles}>
          <DownIndicator />
        </div>
      </div>
    );
  }
}

export default HomeIntro;
