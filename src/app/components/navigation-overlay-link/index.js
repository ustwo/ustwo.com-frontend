'use strict';

import React from 'react';
import classnames from 'classnames';

import Track from '../../adaptors/server/track';
import Flux from '../../flux';

export default class NavigationOverlayLink extends React.Component {
  render() {
    const classes = classnames('navigation-overlay-link', {
      selected: this.props.selected
    });
    return (
      <li className={classes}>
        <a href={this.props.url} onClick={this.onClick}>{this.props.children}</a>
      </li>
    );
  }
  onClick = (e) => {
    e.preventDefault();
    this.props.onClick && this.props.onClick();
    Track('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'nav',   // Required.
      'eventAction': 'click_nav_link',     // Required.
      'eventLabel': this.props.gaId, // TODO: Remove once GA has been hooked into router
    });
    Flux.navigate(this.props.url);
  }
}
