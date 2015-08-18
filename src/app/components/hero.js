'use strict';

import React from 'react';
import classnames from 'classnames';

import EntranceTransition from '../elements/entrance-transition';
import WordAnimation from '../elements/word-animation';
import DownChevron from '../elements/down-chevron';
import Track from '../../server/adaptors/track';

export default class Hero extends React.Component {
  componentDidMount() {
    const duration = this.props.backgroundTint ? 2500 : 1700;
    this.animTimeout = setTimeout(() => {
      this.refs.downChevron.resetAnim();
      this.refs.downChevron.anim();
    }, duration);
  }
  componentWillUnmount() {
    clearTimeout(this.animTimeout);
  }
  render() {
    const props = this.props;
    const styles = {
      backgroundImage: props.backgroundTint ? '' : `url(${props.imageURL})`
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
        <DownChevron customClass="hero__down-chevron" ref="downChevron" onClick={this.onClickDownChevron} />
      </section>
    );
  }
  renderImage = () => {
    const props = this.props;
    let image;
    if (props.backgroundTint) {
      image = (
        <EntranceTransition className='image-entrance'>
          <img className="hero__image" src={props.imageURL} />
        </EntranceTransition>
      );
    } else {
      image = <img className="hero__image" src={props.imageURL} />;
    }
    return image;
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
