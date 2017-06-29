import React, { Component } from 'react';
import classnames from 'classnames';
import window from 'app/adaptors/server/window';
import env from 'app/adaptors/server/env';

import EntranceTransition from 'app/components/entrance-transition';
import WordAnimation from 'app/components/word-animation';
import DownIndicator from 'app/components/down-indicator';
import Rimage from 'app/components/rimage';
import Track from 'app/adaptors/server/track';

class Hero extends Component {
  constructor(props) {
    super(props);

    this.onClickDownIndicator = () => {
      this.trackDownIndicatorClick(this.props.eventLabel);
    }
  }

  renderImage() {
    const { sizes, altText, transitionImage } = this.props;
    const image = <Rimage sizes={sizes} altText={altText} />;
    let output = image;
    if (transitionImage) {
      output = React.createElement(
        EntranceTransition,
        { className: 'image-entrance' },
        image
      );
    }
    return output;
  }

  trackDownIndicatorClick(eventLabel) {
    Track('send', {
      'hitType': 'event',
      'eventCategory': 'hub_page',
      'eventAction': 'click_animated_Indicator',
      'eventLabel': eventLabel
    });
  }

  render() {
    const { className, title, children, scrollProgress, eventLabel, notFullScreen, viewportDimensions, fixedHeight, heroImage } = this.props;
    const scrollProgressValue = scrollProgress ? scrollProgress : 0;
    const transform = `translateY(${Math.min(((0.5 - scrollProgressValue) * 4) * 30, 0)}px)`;

    let transitionStyles, videoTransitionStyles;
    if (scrollProgress) {
      transitionStyles = {
        opacity: (0.75 - scrollProgress) * 4,
        transform: transform
      };
      videoTransitionStyles = {
        transform: transform
      }
    }

    let sectionTitle;
    if (eventLabel) {
      sectionTitle = eventLabel === 'work' ? 'Our Work' : eventLabel.toUpperCase();
    }

    const classes = classnames('hero', className, { notFullScreen });

    let styles;
    if (fixedHeight && env.Modernizr.touchevents) {
      styles = { height: `${fixedHeight}px` }
    }

    return (
      <section className={classes} style={styles}>
        <div className="hero-inner-wrapper">
          {
            heroImage &&
            <div className="hero-image" style={videoTransitionStyles} />
          }
          {this.props.logo && this.props.logo}
          <div className="title-entrance">
            <div className="hero-content" style={transitionStyles}>
              <div className="section-title">
                <WordAnimation delay={0.3} duration={0.2}>{sectionTitle}</WordAnimation>
              </div>
              <h1 className="title">
                <WordAnimation delay={0.5} duration={0.32}>{title}</WordAnimation>
              </h1>
              {
                this.props.subheading &&
                <p className="subheading">{this.props.subheading}</p>
              }
              {children}
            </div>
            <div className="hero-down-indicator" style={transitionStyles}>
              {
                this.props.showDownIndicator &&
                <DownIndicator onClick={this.onClickDownIndicator} />
              }
            </div>
          </div>
          {
            this.props.video &&
            <div className="hero-video" style={videoTransitionStyles}>
              {this.props.video}
            </div>
          }
        </div>
        {this.renderImage()}
      </section>
    );
  }
};

export default Hero;
