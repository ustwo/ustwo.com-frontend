import React, { Component } from 'react';
import classnames from 'classnames';

import Track from 'app/adaptors/server/track';
import Flux from 'app/flux';

class NavigationOverlayLink extends Component {

  onClick(e) {
    e.preventDefault();
    this.props.onClick && this.props.onClick();
    Track('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'nav',   // Required.
      'eventAction': 'click_nav_link',     // Required.
      'eventLabel': this.props.gaId, // TODO: Remove once GA has been hooked into router
    });
    Flux.navigate(this.props.url);
    Flux.closeModal();
  }

  render() {
    const { selected, url, children } = this.props;
    const classes = classnames('navigation-overlay-link', {
      selected: selected
    });

    /* TEMP: to replace What we do with work for the purposes of demoing */
    let alternativeText;
    if (children === 'What We Do') {
      alternativeText = 'work';
    }
    /* END */

    let mouseOver = url === '/' ? 'home' : url.slice(1);

    return (
      <li className={classes}>
        <a href={url} onClick={this.onClick.bind(this)}>{alternativeText ? alternativeText : children}</a>
      </li>
    );
  }

};

export default NavigationOverlayLink;
