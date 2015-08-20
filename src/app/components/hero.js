'use strict';

import React from 'react';
import classnames from 'classnames';

import EntranceTransition from '../elements/entrance-transition';
import WordAnimation from '../elements/word-animation';
import DownChevron from '../elements/down-chevron';
import Rimage from '../elements/rimage';
import Track from '../../server/adaptors/track';

export default class Hero extends React.Component {
  componentDidMount() {
    if (this.props.showDownChevron) {
      const duration = this.props.backgroundTint ? 2500 : 1700;
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
    const styles = {
      backgroundImage: props.backgroundTint ? null : `url(${props.imageURL})`
    }
    const headlineWordsAnimationOptions = {
      ease: Power2.easeOut,
      opacity: 0,
      y: 30
    }

    return (
      <section className='hero' style={styles}>
        <EntranceTransition className='title-entrance'>
          <h1 className='hero__title'>
            <WordAnimation delay={1} duration={0.5} options={headlineWordsAnimationOptions}>
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
    const props = this.props;
    let image;
    if (props.backgroundTint) {
      image = (
        <EntranceTransition className='image-entrance'>
          <Rimage className="hero__image" src={props.imageURL} />
        </EntranceTransition>
      );
    } else {
      image = <Rimage className="hero__image" src={props.imageURL} />;
    }
    return image;
  }
  renderDownChevron = () => {
    let chevron;
    if (this.props.showDownChevron) {
      chevron = <DownChevron customClass="hero__down-chevron" ref="downChevron" onClick={this.onClickDownChevron} />;
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
