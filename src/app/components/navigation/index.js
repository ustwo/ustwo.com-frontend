'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';

import Flux from 'app/flux';
import Nulls from 'app/flux/nulls';

import ScrollMagic from 'app/adaptors/server/scroll-magic';
import Track from 'app/adaptors/server/track';
import SVG from 'app/components/svg';
import NavigationLink from 'app/components/navigation-link';
import NavigationToggle from 'app/components/navigation-toggle';
import FramesUstwoLogo from 'app/components/frames-ustwo-logo';

const Navigation = React.createClass({
  openOverlay() {
    Flux.showNavOverlay();
  },
  getInitialState() {
    return {
      scrollProgress: 0
    }
  },
  componentDidMount() {
    if (this.props.section === 'home') {
      const controller = new ScrollMagic.Controller();

      const scrollProgress = (e) => {
        this.setState({ scrollProgress: e.progress });
      }

      const scene = new ScrollMagic.Scene({
        triggerElement: "#first",
        duration: "100%",
        triggerHook: 'onLeave'
      })
      .on("progress", scrollProgress)
      .addTo(controller);
    }
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
  renderLogo() {
    let logo;
    if (this.props.section === 'home') {
      logo = <FramesUstwoLogo scrollProgress={this.state.scrollProgress} reverse={false} />
    } else {
      logo = <SVG title="ustwo logo" spritemapID="ustwologo" />
    }
    return logo;
  },
  render() {
    const { section, page, takeover, customClass } = this.props;
    const headerClasses = classnames('header', section, page, {
      'takeover': takeover
    });
    return (
      <header className={headerClasses}>
        <nav className={classnames('navigation', customClass)}>
          <div className="logo">
            <a href="/" onClick={this.onClickLogo}>
              {this.renderLogo()}
            </a>
          </div>
          <NavigationToggle onOpen={this.openOverlay} />
          <div className="menu">
            <ul>{this.renderNavigationLinks()}</ul>
          </div>
        </nav>
      </header>
    );
  }
});

export default Navigation;
