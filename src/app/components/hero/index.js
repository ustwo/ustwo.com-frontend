'use strict';

import React from 'react';
import classnames from 'classnames';

import EntranceTransition from '../entrance-transition';
import WordAnimation from '../word-animation';
import DownChevron from '../down-chevron';
import Rimage from '../rimage';
import Track from '../../adaptors/server/track';

export default class Hero extends React.Component {
  componentDidMount() {
    if (this.props.showDownChevron) {
      const duration = this.props.transitionImage ? 2500 : 1700;
      this.animTimeout = setTimeout(() => {
        this.refs.downChevron.resetAnim();
        this.refs.downChevron.anim();
      }, duration);
    }
  }
  componentWillUnmount() {
    if (this.props.showDownChevron) {
      clearTimeout(this.animTimeout);
    }
  }
  render() {
    const props = this.props;

    return (
      <section className={classnames("hero", props.className)}>
        <EntranceTransition className='title-entrance'>
          <h1 className='title'>
            <WordAnimation delay={1} duration={0.5}>
              {props.title}
            </WordAnimation>
          </h1>
        </EntranceTransition>
        {this.renderImage()}
        {props.children}
        {this.renderDownChevron()}
      </section>
    );
  }
  renderImage = () => {
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
  renderDownChevron = () => {
    let chevron;
    if (this.props.showDownChevron) {
      chevron = <DownChevron ref="downChevron" onClick={this.onClickDownChevron} />;
    }
    return chevron;
  }
  onClickDownChevron() {
    Track('send', {
      'hitType': 'event',
      'eventCategory': 'hub_page',
      'eventAction': 'click_animated_chevron',
      'eventLabel': this.props.eventLabel
    });
  }
}
