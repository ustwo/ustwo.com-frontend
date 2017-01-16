import React from 'react';
import SVG from 'app/components/svg';

const rainbowColours = ['rgba(0,0,0,.3)', '#111111'];

function HomeIntro({ scrollProgress, mousePosition, handleNextClick }) {
  /* TODO: reverse the axis to change apparent persepective */
  const logoLayers = rainbowColours.map((colour, i) => {
    let modifier = 2 * ((rainbowColours.length - i) * (rainbowColours.length - i) * 0.5);

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
    return (<SVG title="ustwo logo layer" spritemapID="ustwologo" style={styles} />);
  });

  return (
    <div className="home-intro">
      <div className="home-intro-logo">
        {logoLayers}
      </div>
      <div className="home-next-slide" onClick={handleNextClick}></div>
    </div>
  );
}

module.exports = HomeIntro;
