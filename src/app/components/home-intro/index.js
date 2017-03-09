import React from 'react';
import transitionOnScroll from 'app/lib/transition-on-scroll';
import env from 'app/adaptors/server/env';
import window from 'app/adaptors/server/window';

import SVG from 'app/components/svg';
import Video from 'app/components/video';

// const rainbowColours = ['#ED0082', '#E60C29', '#FF5519', '#FFBF02', '#96CC29', '#14C04D', '#16D6D9', '#009CF3', '#143FCC', '#6114CC', '#111111'];
const colours = ['#000000', '#FFFFFF'];

function HomeIntro({ scrollProgress, mousePosition, scrolling, appLoaded, isMobile, popup }) {

  /*
    Create stack of logos in a sort of 3D space that move dependant on the mouse position.
  */
  const logoLayers = colours.map((fill, i) => {
    let modifier = 5 * ((colours.length - i) * 2);
    let modifierRotate = 2 * ((colours.length - (i - 1)) * 2);

    /* Reverse signs for mousePosition */
    let coordinateX = mousePosition.coordinateX * -1;
    let coordinateY = mousePosition.coordinateY * -1;

    /* Hide all layers except the top one when scrolling to reduce perfomance hit (especially if layers are CSS blurred) */
    let transform, display;
    // if (scrolling && i != colours.length - 1) {
    //   display = `none`;
    // }

    let translateZ;
    if (i != colours.length - 1) {
      let value = 10 + Math.abs(coordinateX * 10);
      translateZ = `-${value}px`;
    } else {
      translateZ = 0;
    }

    if (!isMobile) {
      transform = `translate3d(${coordinateX * modifier}px, ${coordinateY * modifier}px, ${translateZ}) rotateY(${coordinateX * modifierRotate}deg) rotateX(${coordinateY * modifierRotate}deg)`;
    }

    if (i != colours.length - 1 && isMobile) {
      display = 'none'
    }

    let styles = { transform, fill, display }

    let classes;
    if (i === 0) {
      classes = 'layer-background'
    }

    return (
      <SVG
        title="ustwo logo layer"
        key={`layer-${i}`}
        className={classes}
        spritemapID="ustwologo"
        style={styles}
        viewBox="0 0 112 32"
      />
    );
  });

  let playVideo = appLoaded;
  if (scrollProgress === 1 || !!popup) {
    playVideo = false;
  }

  let src;
  if (isMobile) {
    src= 'https://player.vimeo.com/external/205373063.sd.mp4?s=eedf82905ed3ecba67b0f7ce3d2200309156ee36&profile_id=165';
  } else {
    src= 'https://player.vimeo.com/external/195475311.sd.mp4?s=fea332405de6ad2bea1d9082ea6b98184269111e&profile_id=165';
  }

  return (
    <div className="home-intro">
      <Video
        src={src}
        isVideoBackground={true}
        play={playVideo}
        imageCSS="/images/home/header-fallback-image.jpg"
      />
      <div className="home-intro-logo">
        <div className="home-intro-logo-wrapper">
          {logoLayers}
        </div>
      </div>
      <div className="home-intro-down-arrow"></div>
    </div>
  );
}

export default HomeIntro;
