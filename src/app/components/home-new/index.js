'use strict';

import React from 'react';
import classnames from 'classnames';
import getFeaturedImage from 'app/lib/get-featured-image';
import get from 'lodash/object/get';
import ScrollMagic from 'app/adaptors/server/scroll-magic';

import ScreenBlock from 'app/components/screen-block';
import SVG from 'app/components/svg';
import FramesUstwoLogo from 'app/components/frames-ustwo-logo';
import Hero from 'app/components/hero';
import Video from 'app/components/video';

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
    const controller = new ScrollMagic.Controller();

    const scrollProgress = (e) => {
      this.setState({ scrollProgress: e.progress });
    }

    const scene = new ScrollMagic.Scene({
      triggerElement: "#first",
      duration: "50%",
      triggerHook: 'onLeave'
    })
    .on("progress", scrollProgress)
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


        {/* Block 2 */}
        <ScreenBlock
          ref="blockAbout"
          customClass="about"
          textColour={get(page, 'colors.primary')}
          bgColour={get(page, 'colors.bg')}
        >
          We work as Partners to the biggest, smartest brands
        </ScreenBlock>

      </article>
    );
  }
});

export default PageHomeNew;
