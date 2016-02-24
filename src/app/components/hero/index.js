'use strict';

import React from 'react';
import classnames from 'classnames';

import EntranceTransition from 'app/components/entrance-transition';
import WordAnimation from 'app/components/word-animation';
import DownChevron from 'app/components/down-chevron';
import Rimage from 'app/components/rimage';
import Track from 'app/adaptors/server/track';

const Hero = React.createClass({
  componentDidMount() {
    if (this.props.showDownChevron) {
      const duration = this.props.transitionImage ? 2500 : 1700;
      this.animTimeout = setTimeout(() => {
        this.refs.downChevron.resetAnim();
        this.refs.downChevron.anim();
      }, duration);
    }
  },
  componentWillUnmount() {
    if (this.props.showDownChevron) {
      clearTimeout(this.animTimeout);
    }
  },
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
  },
  renderSubheading() {
    let subheading;
    if(this.props.subheading) {
      subheading = <p className="subheading">{this.props.subheading}</p>
    }
    return subheading;
  },
  renderDownChevron() {
    let chevron;
    if (this.props.showDownChevron) {
      chevron = <DownChevron
        ref="downChevron"
        onClick={this.onClickDownChevron}
      />;
    }
    return chevron;
  },
  onClickDownChevron() {
    Track('send', {
      'hitType': 'event',
      'eventCategory': 'hub_page',
      'eventAction': 'click_animated_chevron',
      'eventLabel': this.props.eventLabel
    });
  },
  render() {
    const { className, title, children } = this.props;
    return <section className={classnames('hero', className)}>
      <EntranceTransition className="title-entrance">
        <h1 className="title">
          <WordAnimation delay={1} duration={0.5}>{title}</WordAnimation>
        </h1>
        {this.renderSubheading()}
      </EntranceTransition>
      {this.renderImage()}
      {children}
      {this.renderDownChevron()}
    </section>;
  }
});

export default Hero;
