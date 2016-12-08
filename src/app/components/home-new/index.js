'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import getFeaturedImage from 'app/lib/get-featured-image';
import blendColours from 'app/lib/blend-colours';
import { get } from 'lodash';
import ScrollMagic from 'app/adaptors/server/scroll-magic';
import window from 'app/adaptors/server/window';
import env from 'app/adaptors/server/env';

import ScreenBlock from 'app/components/screen-block';
import SVG from 'app/components/svg';
import FramesUstwoLogo from 'app/components/frames-ustwo-logo';
import Hero from 'app/components/hero';
import Video from 'app/components/video';
import WordAnimation from 'app/components/word-animation';
import EntranceTransition from 'app/components/entrance-transition';
import BoldHeader from 'app/components/bold-header';
import Prefixer from 'inline-style-prefixer';
import Carousel from 'app/components/carousel';

const userAgent = { userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/25.0.1216.0 Safari/537.2' }

function scrollProgress(component, name) {
  return (e) => {
    let obj = {};
    let key = `scrollProgressBlock${name}`;
    let value = Math.round(e.progress * 100) / 100;
    obj[key] = value;
    component.setState(obj);
  }
}

const PageHomeNew = React.createClass({

  getInitialState() {
    return {
      scrollProgressBlockHome: 0,
      clientIntroTrigger: false
    }
  },

  componentWillMount() {
    // if (!env.Modernizr.touchevents && window.innerWidth > 1024) {
    //   this.setState({ desktop: true });
    // }
  },

  componentDidMount() {

    // Setup Scrollmagic
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
      triggerElement: this.refs.blockHero,
      duration: '100%',
      triggerHook: 'onLeave'
    })
    .on('progress', scrollProgress(this, 'Home'))
    .addTo(controller);

    // Colour blend

    new ScrollMagic.Scene({
      triggerElement: '.colour-blend',
      triggerHook: 'onLeave',
      duration: '200%'
    })
    .setClassToggle(".colour-blend", "scrolling")
    .addTo(controller);


    const colourBlendBackground = ReactDOM.findDOMNode(this.refs.colourBlendBackground);

    colourBlendBackground.style.backgroundColor = `linear-gradient(45deg, #16D6D9, 0%, #96CC29, 100%)`; // Set initial colour of colour blend element

    new ScrollMagic.Scene({
      triggerElement: '.colour-blend',
      triggerHook: 'onLeave',
      duration: '100%',
      offset: '100%'
    })
    .on('progress', (e) => {
      window.requestAnimationFrame(() => {
        colourBlendBackground.style.background = `linear-gradient(45deg, #${blendColours('#16D6D9', '#009CF3', e.progress)} 0%, #${blendColours('#96CC29', '#16D6D9', e.progress)} 100%)`;
      });
      if (e.progress > 0.5) {
        this.setState({
          clientIntroTrigger: true
        })
      }
    })
    .addTo(controller);

  },

  render() {
    const classes = classnames('page-home-new', this.props.className);
    const logoStyles = {
      opacity: 1 - this.state.scrollProgressBlockHome,
      transform: `translate3d(0, ${30 * this.state.scrollProgressBlockHome}vh, 0)`
    }
    // const logo = <FramesUstwoLogo componentStyle={logoStyles} scrollProgress={this.state.scrollProgressBlockHome} isReverse={true} />;
    const logo = (
      <div className="large-logo-wrapper" style={logoStyles}>
        <SVG title="ustwo logo" spritemapID="ustwologo" />
      </div>
    );

    let titleStyle;
    // if (scrollProgress) {
    //   titleStyle = {
    //     opacity: 1 - scrollProgress,
    //     transform: `translate3d(0, ${35 * scrollProgress}vh, 0)`
    //   }
    // }

    return (
      <article className={classes} id="hero">

        {/* Hero */}
        <div className="block-wrapper" ref="blockHero">
          <Hero
            title="We build Digital Products, Services and Businesses"
            transitionImage={true}
            eventLabel='home-new'
            logo={logo}
            scrollProgress={this.state.scrollProgressBlockHome}
            className="block-wrapper block1"
            ref="blockHome"
          >
            <Video
              src="/images/temp/home-new-video.mp4"
              sizes={sizes}
              isVideoBackground={true}
            />
          </Hero>
        </div>

        <div className="colour-blend" ref="colourBlend">
          <div className="block-wrapper block-client-intro">
              <h2 className="title" style={titleStyle}>
                <WordAnimation delay={1} duration={0.5} trigger={this.state.clientIntroTrigger}>And then some text here that introduces the client carousel section</WordAnimation>
              </h2>
          </div>
          {/* Carousel 1 - Client */}
          <div className="block-wrapper">
            <Carousel data={carouselContentClient} />
          </div>
          <div className="colour-blend-background" ref="colourBlendBackground"></div>
        </div>

        {/* Carousel 2 - Ventures */}
        <div className="block-wrapper">
          <Carousel data={carouselContentVentures} styles={carouselStylesVentures} />
        </div>

      </article>
    );
  }
});

export default PageHomeNew;



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
const carouselContentClient = [
  {
    title: "Sky Kids",
    text: "We partnered with Sky to create a fun, intuitive and safe way for kids to enjoy their favourite TV shows",
    image: "/images/temp/home-skykids.png"
  }, {
    title: "Ford GoPark",
    text: "Tackling the problem of parking head-on, GoPark is an app and service that integrates vehicles and the city in new and meaningful ways.",
    image: "/images/temp/home-gopark.png"
  }, {
    title: "Foursquare",
    text: "text",
    image: "/images/temp/home-foursquare.png"
  }
];
const carouselContentVentures = [
  {
    title: "Dice",
    text: "text",
    image: "/images/temp/home-dice.png"
  }
];

const carouselStylesVentures = {
  backgroundImage: `linear-gradient(228deg, #ff5519, #ed0082)`,
};

// Attempt at making my own component for tracking scroll position of any element
// function getScrollPosition(element) {
//   const elementStats = element.getClientRects();
//   const positionFromTop = elementStats[0].top;
//   const elementHeight = elementStats[0].height;
//
//   return Math.round(positionFromTop / elementHeight * 100) / 100;
// }
// End TEMP
