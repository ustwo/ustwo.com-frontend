'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';

import Flux from '../../flux';
import Nulls from '../../flux/nulls';

import Track from '../../adaptors/server/track';
import SVG from '../svg';
import NavigationLink from '../navigation-link';
import NavigationToggle from '../navigation-toggle';

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
  renderNavigationLinks() {
    return get(this.props, 'pages', []).map(link => {
      return <NavigationLink
        key={link.id}
        url={link.slug === 'home' ? '/' : `/${link.slug}`}
        colour={link.colour}
        selected={link.slug === this.props.section}
        gaId={link.ga}
      >
        {link.title}
      </NavigationLink>;
    });
  },
  render() {
    const { section, page, takeover, customClass } = this.props;
    const headerClasses = classnames('header', section, page, {
      'takeover': takeover
    });

    return <header className={headerClasses}>
      <nav className={classnames('navigation', customClass)}>
        <div className="logo">
          <a href="/" onClick={this.onClickLogo}>
            <SVG title="ustwo logo" spritemapID="ustwologo" />
          </a>
        </div>
        <NavigationToggle onOpen={this.openOverlay} />
        <div className="menu">
          <ul>{this.renderNavigationLinks()}</ul>
        </div>
      </nav>
    </header>;
  }
});

export default Navigation;
