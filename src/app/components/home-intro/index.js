
import React from 'react';
import SVG from 'app/components/svg';
import Video from 'app/components/video';
import transitionOnScroll from 'app/lib/transition-on-scroll';

// const rainbowColours = ['#ED0082', '#E60C29', '#FF5519', '#FFBF02', '#96CC29', '#14C04D', '#16D6D9', '#009CF3', '#143FCC', '#6114CC', '#111111'];
const colours = ['#000000', '#FFFFFF'];
const distance = -250;

function HomeIntro({ scrollProgress, mousePosition }) {
  /* TODO: reverse the axis to change apparent persepective */
  const logoLayers = colours.map((colour, i) => {
    let modifier = 3 * ((colours.length - i) * (colours.length - i) * 0.9);

    /* Reverse signs for mousePosition */
    let coordinateX, coordinateY
    if (mousePosition.coordinateX > 0) {
      coordinateX = Math.abs(mousePosition.coordinateX) * -1;
    } else {
      coordinateX = Math.abs(mousePosition.coordinateX);
    }
    if (mousePosition.coordinateY > 0) {
      coordinateY = Math.abs(mousePosition.coordinateY) * -1;
    } else {
      coordinateY = Math.abs(mousePosition.coordinateY);
    }

    let styles = {
      transform: `translate3d(${coordinateX * modifier}px, ${coordinateY * modifier}px, 0)`,
      fill: colour
    }

    return (<SVG title="ustwo logo layer" className={`layer-${i}`} spritemapID="ustwologo" style={styles} />);
  });

  let styles = {
    opacity: transitionOnScroll(scrollProgress, 0, 0, 0.5, 1)
  }

  let logoStyles = {
    transform: `translate3d(0,${transitionOnScroll(scrollProgress, 0, 0, 0.5, 1, distance, true)}px,0)`
  }

  return (
    <div className="home-intro" style={styles}>
      <Video
        src="/images/temp/home-intro-video.mp4"
        isVideoBackground={true}
        imageCSS="/images/home/header-fallback-image.jpg"
      />
      <div className="home-intro-logo" style={logoStyles}>
        {logoLayers}
      </div>
    </div>
  );
}

module.exports = HomeIntro;
