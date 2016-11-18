'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import getFeaturedImage from 'app/lib/get-featured-image';
import blendColours from 'app/lib/blend-colours';
import { get } from 'lodash';
import ScrollMagic from 'app/adaptors/server/scroll-magic';

import ScreenBlock from 'app/components/screen-block';
import SVG from 'app/components/svg';
import FramesUstwoLogo from 'app/components/frames-ustwo-logo';
import Hero from 'app/components/hero';
import Video from 'app/components/video';
import WordAnimation from 'app/components/word-animation';
import EntranceTransition from 'app/components/entrance-transition';
import BoldHeader from 'app/components/bold-header';
import Prefixer from 'inline-style-prefixer';

// TEMP
const sizes = {
  "thumbnail": {
    "file": "header_image_v2-300x300.png",
    "width": 300,
    "height": 300,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-300x300.png"
  },
  "small": {
    "file": "header_image_v2-576x480.png",
    "width": 576,
    "height": 480,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-576x480.png",
    "name": "small"
  },
  "small_crop": {
    "file": "header_image_v2-640x480.png",
    "width": 640,
    "height": 480,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-640x480.png"
  }
};
// End TEMP

const userAgent = { userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/25.0.1216.0 Safari/537.2' }

function scrollProgress(component, i) {
  return (e) => {
    let obj = {};
    let key = `scrollProgressBlock${i+1}`;
    let value = Math.round(e.progress * 100) / 100;
    obj[key] = value;
    component.setState(obj);
  }
}

const PageHomeNew = React.createClass({

  getInitialState() {
    return {
      scrollProgressBlock1: 0,
      scrollProgressBlock2: 0,
      scrollProgressBlock3: 0
    }
  },

  componentDidMount() {

    // Setup Scrollmagic
    const controller = new ScrollMagic.Controller();

    // Get scroll progress for each block
    const blocks = document.querySelectorAll('.block-wrapper');

    blocks.forEach((block, i) => {
      new ScrollMagic.Scene({
        triggerElement: block,
        duration: '100%',
        triggerHook: 'onLeave'
      })
      .on('progress', scrollProgress(this, i))
      .addTo(controller);
    });


    // Colour blend

    // const colourBlendElement = ReactDOM.findDOMNode(this.refs.scrollContainer);
    //
    // colourBlendElement.style.backgroundColor = '#009CF3'; // Set initial colour of colour blend element
    //
    // new ScrollMagic.Scene({
    //   triggerElement: '.screen-block.about',
    //   triggerHook: 'onLeave',
    //   duration: '100%'
    // })
    // .on('progress', (e) => {
    //   window.requestAnimationFrame(() => {
    //     colourBlendElement.style.background = `linear-gradient(45deg, #${blendColours('#0065c9', '#76d377', e.progress)} 0%, #${blendColours('#00ccda', '#68d79e', e.progress)} 100%)`;
    //   });
    // })
    // .addTo(controller);

  },

  render() {
    const classes = classnames('page-home-new', this.props.className);
    const logoStyles = { transform: `translate3d(0, ${25 * this.state.scrollProgressBlock1}vh, 0)` }
    const logo = <FramesUstwoLogo componentStyle={logoStyles} scrollProgress={this.state.scrollProgressBlock1} isReverse={true} />;

    const leftSplitBlock1 = this.state.scrollProgressBlock1 * 10;
    const rightSplitBlock1 = (1 - this.state.scrollProgressBlock1) * 10;
    const leftSplitBlock2 = this.state.scrollProgressBlock2 * 10;
    const rightSplitBlock2 = (1 - this.state.scrollProgressBlock2) * 10;
    const leftSplitBlock3 = this.state.scrollProgressBlock3 * 10;
    const rightSplitBlock3 = (1 - this.state.scrollProgressBlock3) * 10;

    const block2Styles = new Prefixer(userAgent).prefix({
      backgroundImage: `linear-gradient(228deg, #ff5519, #ed0082)`,
      clipPath: `polygon(0 ${leftSplitBlock1}vh, 100% ${rightSplitBlock1}vh, 100% 100%, 0 100%)`,
    });

    const block3Styles = new Prefixer(userAgent).prefix({
      backgroundImage: `linear-gradient(228deg, #14c04d, #96cc29)`,
      clipPath: `polygon(0 ${leftSplitBlock2}vh, 100% ${rightSplitBlock2}vh, 100% 100%, 0 100%)`,
    });

    const homeFooterStyles = new Prefixer(userAgent).prefix({
      clipPath: `polygon(0 ${leftSplitBlock3}vh, 100% ${rightSplitBlock3}vh, 100% 100%, 0 100%)`
    });

    return (
      <article className={classes} id="hero">

        {/* Hero */}
        <Hero
          title="We're a Digital Product Studio"
          transitionImage={true}
          eventLabel='home-new'
          logo={logo}
          scrollProgress={this.state.scrollProgressBlock1}
          className="block-wrapper block1"
        >
          <Video
            src="/images/temp/home-new-video.mp4"
            sizes={sizes}
            isVideoBackground={true}
          />
        </Hero>

        {/* Block 1 - Client */}
        <div className="block-wrapper block2">
          <ul className="carousel carousel--client" style={block2Styles}>
            <li>
              <h2>Slide 1</h2>
              <p>Some content</p>
            </li>
          </ul>
        </div>

        {/* Block 2 - Own IP */}
        <div className="block-wrapper block3">
          <ul className="carousel carousel--own-ip" style={block3Styles}>
            <li>
              <h2>Slide 1</h2>
              <p>Some content</p>
            </li>
          </ul>
        </div>

        <div className="home-footer" style={homeFooterStyles}></div>

      </article>
    );
  }
});

export default PageHomeNew;
