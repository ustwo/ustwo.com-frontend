import React from 'react';
import SVG from 'app/components/svg';

const rainbowColours = ['#ED0082', '#E60C29', '#FF5519', '#FFBF02', '#96CC29', '#14C04D', '#16D6D9', '#009CF3', '#143FCC', '#6114CC', '#111111'];

function HomeIntro({ scrollProgress, mousePosition, handleNextClick }) {
  const logoLayers = rainbowColours.map((colour, i) => {
    let modifier = 2 * ((rainbowColours.length - i) * (rainbowColours.length - i) * 0.2);
    let styles = {
      transform: `translate(${mousePosition.coordinateX * modifier}px, ${mousePosition.coordinateY * modifier}px)`,
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
