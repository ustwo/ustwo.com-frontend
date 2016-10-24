'use strict';

import React from 'react';
import classnames from 'classnames';

import EntranceTransition from 'app/components/entrance-transition';
import WordAnimation from 'app/components/word-animation';
import DownChevron from 'app/components/down-chevron';
import Rimage from 'app/components/rimage';
import Track from 'app/adaptors/server/track';

const Hero = React.createClass({
  getInitialState() {
    return {
      chevronLoaded: false
    }
  },
  componentDidMount() {
    if (this.props.showDownChevron) {
      this.animTimeout = setTimeout(() => {
        this.refs.downChevron.resetAnim();
        this.refs.downChevron.anim();
        this.setState({
          chevronLoaded: true
        });
      }, 1500);
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
        customClass={this.state.chevronLoaded ? 'loaded' : ''}
      />;
    }
    return chevron;
  },
  renderLogo() {
    let logo;
    if (this.props.logo) {
      logo = this.props.logo;
    }
    return logo;
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
    const { className, title, children, scrollProgress } = this.props;
    const titleStyle = {
      opacity: 1 - scrollProgress,
      transform: `translate3d(0, ${25 * scrollProgress}vh, 0)`
    }

    return (
      <section className={classnames('hero', className)}>
        {this.renderLogo()}
        <EntranceTransition className="title-entrance">
          <h1 className="title" style={titleStyle}>
            <WordAnimation delay={1} duration={0.5}>{title}</WordAnimation>
          </h1>
          {this.renderSubheading()}
        </EntranceTransition>
        {this.renderImage()}
        {children}
        {this.renderDownChevron()}
      </section>
    );
  }
});

export default Hero;
