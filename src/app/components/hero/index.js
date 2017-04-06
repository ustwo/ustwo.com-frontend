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

  renderImage() {
    const { sizes, altText, transitionImage } = this.props;
    const image = <Rimage sizes={sizes} altText={altText} />;
    let output;
    if (transitionImage) {
      output = React.createElement(
        EntranceTransition,
        { className: 'image-entrance' },
        image
      );
    } else {
      output = image;
    }
    return output;
  }

  renderVideo() {
    return this.props.video ? this.props.video : null;
  }

  renderSubheading() {
    return this.props.subheading ? <p className="subheading">{this.props.subheading}</p> : null;
  }

  renderDownIndicator() {
    let indicator;
    if (this.props.showDownIndicator) {
      indicator = (
        <DownIndicator
          ref="downIndicator"
          onClick={this.onClickDownIndicator}
        />
      );
    }
    return indicator;
  }

  renderLogo() {
    return this.props.logo ? this.props.logo : null;
  }

  onClickDownIndicator() {
    Track('send', {
      'hitType': 'event',
      'eventCategory': 'hub_page',
      'eventAction': 'click_animated_Indicator',
      'eventLabel': this.props.eventLabel
    });
  }

  render() {
    const { className, title, children, scrollProgress, eventLabel, notFullScreen, viewportDimensions, fixedHeight } = this.props;
    let transitionStyles;
    if (scrollProgress) {
      transitionStyles = {
        opacity: (0.75 - scrollProgress) * 4,
        transform: `translateY(${((0.5 - scrollProgress) * 4) * 30}px)`
      };
    }
    const sectionTitle = eventLabel === 'work' ? 'Our Work' : eventLabel.toUpperCase();
    const classes = classnames('hero', className, { notFullScreen });

    let styles;
    if (fixedHeight && env.Modernizr.touchevents) {
      styles = { height: fixedHeight }
    }

    return (
      <section className={classes} styles={styles}>
        <div className="hero-inner-wrapper">
          {this.renderLogo()}
          <EntranceTransition className="title-entrance">
            <div className="hero-content" style={transitionStyles}>
              <div className="section-title">
                <WordAnimation delay={0.32} duration={0.2}>{sectionTitle}</WordAnimation>
              </div>
              <h1 className="title">
                <WordAnimation delay={0.5} duration={0.32}>{title}</WordAnimation>
              </h1>
              {this.renderSubheading()}
              {children}
            </div>
            <div className="hero-down-indicator" style={transitionStyles}>
              {this.renderDownIndicator()}
            </div>
          </EntranceTransition>
          {this.renderVideo()}
        </div>
        {this.renderImage()}
      </section>
    );
  }
};

export default Hero;
