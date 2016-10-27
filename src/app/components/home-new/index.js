'use strict';

import React from 'react';
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

const PageHomeNew = React.createClass({

  getInitialState() {
    return {
      scrollProgress: 0
    }
  },

  componentDidMount() {

    // Setup Scrollmagic
    const controller = new ScrollMagic.Controller();


    // Track scroll progress to animate logo

    const scrollProgress = (e) => {
      this.setState({ scrollProgress: e.progress });
    }

    new ScrollMagic.Scene({
      triggerElement: '#first',
      duration: '50%',
      triggerHook: 'onLeave'
    })
    .on('progress', scrollProgress)
    .addTo(controller);


    // Wipes

    const slides = document.querySelectorAll("section.panel");

    for (let i = 0; i < slides.length - 1; i++) {
      new ScrollMagic.Scene({
        triggerElement: slides[i],
        triggerHook: 'onLeave'
      })
      .setPin(slides[i])
      .addTo(controller);
    }


    // Colour blend

    const colourBlendElement = React.findDOMNode(this.refs.scrollContainer);

    colourBlendElement.style.backgroundColor = '#009CF3'; // Set initial colour of colour blend element

    new ScrollMagic.Scene({
      triggerElement: '.screen-block.about',
      triggerHook: 'onLeave',
      duration: '100%'
    })
    .on('progress', (e) => {
      window.requestAnimationFrame(() => {
        colourBlendElement.style.backgroundColor = `#${blendColours('#009CF3', '#8fdba3', e.progress)}`;
      });
    })
    .addTo(controller);

  },

  render() {
    const { page } = this.props;
    const classes = classnames('page-home-new', this.props.className);
    const logoStyles = {
      transform: `translate3d(0, ${25 * this.state.scrollProgress}vh, 0)`
    }
    const logo = <FramesUstwoLogo style={logoStyles} scrollProgress={this.state.scrollProgress} reverse={true} />;

    return (
      <article className={classes} id="first">

        {/* Block 1 */}
        <Hero
          title="We're a Digital Product Studio"
          transitionImage={true}
          eventLabel='home-new'
          logo={logo}
          scrollProgress={this.state.scrollProgress}
        >
          <Video
            src="/images/temp/home-new-video.mp4"
            sizes={sizes}
            isVideoBackground={true}
          />
        </Hero>

        <div className="scroll-container" ref="scrollContainer">

          {/* Block 2 */}
          <ScreenBlock
            ref="blockAbout"
            customClass="about"
            textColour={get(page, 'colors.primary')}
            bgColour='transparent'
          >
            <EntranceTransition className="title-entrance">
              <div className="headline-text title">
                <BoldHeader colour="white">
                  <WordAnimation delay={1} duration={0.4}>
                    We work as Partners to the biggest, smartest brands
                  </WordAnimation>
                </BoldHeader>
              </div>
            </EntranceTransition>
          </ScreenBlock>

          <div id="section-wipes">
            <section className="panel blue">
            	<b>ONE</b>
            </section>
            <section className="panel red">
            	<b>TWO</b>
            </section>
            <section className="panel yellow">
            	<b>THREE</b>
            </section>
          </div>
        </div>

      </article>
    );
  }
});

export default PageHomeNew;
