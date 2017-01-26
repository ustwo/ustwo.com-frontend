import React, { Component } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import kebabCase from 'lodash/string/kebabCase';

import Flux from 'app/flux';
import Nulls from 'app/flux/nulls';

import window from 'app/adaptors/server/window';
import Track from 'app/adaptors/server/track';
import SVG from 'app/components/svg';
import FramesUstwoLogo from 'app/components/frames-ustwo-logo';

class Navigation extends Component {
  openOverlay() {
    Flux.showNavOverlay();
  }
  onClickLogo(event) {
    const { takeover } = this.props;
    event.preventDefault();
    if (takeover !== Nulls.takeover) {
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'takeover',   // Required.
        'eventAction': 'click_ustwo_logo',  // Required.
        'eventLabel': takeover.name // Name of the takeover as set in WordPress
      });
    }
    Flux.navigate('/');
  }
  render() {
    const { section, page, takeover, customClass } = this.props;
    const navClasses = classnames('navigation', customClass, section, page, {
      'takeover': takeover
    });
    return (
      <nav className={navClasses}>
        <button className="logo" onClick={this.onClickLogo}>
          <SVG title="ustwo logo" spritemapID="ustwologo" />
        </button>
        <button onClick={this.openOverlay.bind(this)} className="navigation-toggle">
          <SVG title="Open menu" spritemapID="menuopen-dark" />
          <SVG title="Menu ring" spritemapID="menu-ring" className="menu-ring" />
        </button>
      </nav>
    );
  }
};

export default Navigation;
