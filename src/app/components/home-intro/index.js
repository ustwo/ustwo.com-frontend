
import React, { Component } from 'react';
import SVG from 'app/components/svg';
import Video from 'app/components/video';
import transitionOnScroll from 'app/lib/transition-on-scroll';
import Scroll from 'react-scroll'; /* Animate and scroll to location in document */

// const rainbowColours = ['#ED0082', '#E60C29', '#FF5519', '#FFBF02', '#96CC29', '#14C04D', '#16D6D9', '#009CF3', '#143FCC', '#6114CC', '#111111'];
const colours = ['#000000', '#FFFFFF'];
const distance = -250;

class HomeIntro extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { scrollProgress, mousePosition, scrolling, loaded } = this.props;

    const logoLayers = colours.map((colour, i) => {
      let modifier = 3 * ((colours.length - i) * (colours.length - i) * 0.9);
      let modifierRotate = 2 * ((colours.length - (i-1)) * (colours.length - (i-1)));

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

      let transform, display;
      if (scrolling && i != colours.length - 1) {
        display = `none`;
      }

      if (!scrolling) {
        transform = `translate3d(${coordinateX * modifier}px, ${coordinateY * modifier}px, 0) rotateY(${coordinateX * modifierRotate}deg) rotateX(${coordinateY * modifierRotate}deg)`;
      }

      let styles = {
        transform: transform,
        fill: colour,
        display: display
      }

      return (<SVG title="ustwo logo layer" className={`layer-${i}`} spritemapID="ustwologo" style={styles} viewBox="0 0 112 32" />);
    });

    let logoStyles = { opacity: 1 - scrollProgress };

    if (loaded) {
      this.refs.homeIntroVideo.play();
    }

    return (
      <div className="home-intro" onClick={() => Scroll.animateScroll.scrollTo(window.innerHeight)}>
        <div className="videoBackground" style={{ backgroundImage: `url('/images/home/header-fallback-image.jpg')` }}>
          <video ref="homeIntroVideo" src="/images/temp/home-intro-video.mp4" poster="/images/transparent.png" loop muted></video>
        </div>
        <div className="home-intro-logo">
          {logoLayers}
        </div>
      </div>
    );
  }
}

export default HomeIntro;
