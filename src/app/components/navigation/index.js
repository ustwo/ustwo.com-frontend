'use strict';

import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import kebabCase from 'lodash/string/kebabCase';

import Flux from 'app/flux';
import Nulls from 'app/flux/nulls';

import window from 'app/adaptors/server/window';
import Track from 'app/adaptors/server/track';
import SVG from 'app/components/svg';
import NavigationToggle from 'app/components/navigation-toggle';
import FramesUstwoLogo from 'app/components/frames-ustwo-logo';

const Navigation = React.createClass({
  openOverlay() {
    Flux.showNavOverlay();
  },
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
  },
  render() {
    const { section, page, takeover, customClass } = this.props;
    const headerClasses = classnames('header', section, page, {
      'takeover': takeover
    });
    return (
      <header className={headerClasses} ref="navigation">
        <nav className={classnames('navigation', customClass)}>
          <div className="logo">
            <a href="/" onClick={this.onClickLogo}>
              <SVG title="ustwo logo" spritemapID="ustwologo" />
            </a>
          </div>
          <NavigationToggle onOpen={this.openOverlay} />
        </nav>
      </header>
    );
  }
});

export default Navigation;
