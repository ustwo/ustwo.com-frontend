'use strict';

import React from 'react';
import classnames from 'classnames';
import getFeaturedImage from 'app/lib/get-featured-image';
import get from 'lodash/object/get';
import ScrollMagic from 'app/adaptors/server/scroll-magic';

import ScreenBlock from 'app/components/screen-block';
import SVG from 'app/components/svg';

const PageHomeNew = React.createClass({

  getInitialState() {
    return {
      scrollProgressLogo: 0
    }
  },

  componentDidMount() {
    const controller = new ScrollMagic.Controller();

    const scrollProgressLogo = (e) => {
      this.setState({ scrollProgressLogo: e.progress });
    }

    const sceneLogo = new ScrollMagic.Scene({
      triggerElement: "#first",
      duration: "50%",
      triggerHook: 'onLeave'
    })
    .on("progress", scrollProgressLogo)
    .addTo(controller);

  },

  render() {
    const { page } = this.props;
    const classes = classnames('page-home-new', this.props.className);

    return (
      <article className={classes} id="first">

        {/* Block 1 */}
        <ScreenBlock
          ref="blockWelcome"
          customClass="welcome"
          textColour={get(page, 'colors.primary')}
          bgColour="#CCCCCC"
        >
          {/* <div className="full-screen-background">
            <img src="/images/home-new-temp.jpg" />
          </div> Replace this with Rimage */}
          <SVG title="ustwo logo" spritemapID="ustwologo" style={{ fill: '#FFFFFF' }} />
          <div>We're a Digital Product Studio</div> {/* Replace this with something like get(page, 'hero.attr.heading.value') */}
        </ScreenBlock>

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
