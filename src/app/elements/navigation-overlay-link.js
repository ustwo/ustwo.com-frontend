'use strict';

import React from 'react';
import classnames from 'classnames';

import Track from '../../server/adaptors/track';
import Flux from '../flux';

export default class NavigationOverlayLink extends React.Component {
  render() {
    const classes = classnames('nav__overlay__menu__item', {
      selected: this.props.selected
    });
    return (
      <li className={classes}>
          <a href={this.props.url} className="nav__overlay__menu__item__link" onClick={this.onClick}>{this.props.children}</a>
      </li>
    );
  }
  onClick = (e) => {
    e.preventDefault();
    this.props.onClick();
    if(this.props.external) {
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'nav',   // Required.
        'eventAction': 'click_nav_link',     // Required.
        'eventLabel': this.props.gaId, // TODO: Remove once GA has been hooked into router
        'hitCallback' : () => {
          window.location = this.props.url;
        }
      });
    } else {
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'nav',   // Required.
        'eventAction': 'click_nav_link',     // Required.
        'eventLabel': this.props.gaId, // TODO: Remove once GA has been hooked into router
      });
      Flux.navigate(this.props.url);
    }
  }
}
