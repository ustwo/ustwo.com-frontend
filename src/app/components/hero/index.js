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
      const duration = this.props.imageOnly ? 2500 : 1700;
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
      <Rimage wrap="section" className={classnames("hero", props.className)} sizes={props.imageOnly ? {} : props.sizes} backgroundOnly={true} >
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
      </Rimage>
    );
  }
  renderImage = () => {
    const props = this.props;
    let image;
    if (props.imageOnly) {
      image = (
        <EntranceTransition className='image-entrance'>
          <Rimage className="image" sizes={this.props.sizes} />
        </EntranceTransition>
      );
    } else {
      image = <Rimage className="image" sizes={this.props.sizes} />;
    }
    return image;
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
