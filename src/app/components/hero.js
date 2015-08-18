'use strict';

import React from 'react';
import classnames from 'classnames';

import Track from '../../server/adaptors/track';
import DownChevron from '../elements/down-chevron';

export default class Hero extends React.Component {
  componentDidMount() {
    this.animTimeout = setTimeout(() => {
      this.refs.downChevron.resetAnim();
      this.refs.downChevron.anim();
    }, 500);
  }
  componentWillUnmount() {
    clearTimeout(this.animTimeout);
  }
  render() {
    const props = this.props;
    const styles = {
      backgroundImage: props.backgroundTint ? '' : `url(${props.imageURL})`
    }

    return (
      <section className="hero" style={styles}>
        <h1 className="hero__title">{props.title}</h1>
        <img className="hero__image" src={props.imageURL} />
        {props.children}
        <DownChevron customClass="hero__down-chevron" ref="downChevron" onClick={this.onClickDownChevron} />
      </section>
    );
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
