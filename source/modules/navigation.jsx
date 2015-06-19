'use strict';

import React from 'react';

import NavigationLink from '../atoms/navigation-link.jsx';
import NavigationOverlayLink from '../atoms/navigation-overlay-link.jsx';
import NavigationOpenOverlayButton from '../atoms/navigation-open-overlay-button.jsx';
import NavigationOverlayCloseButton from '../atoms/navigation-overlay-close-button.jsx';

const Navigation = React.createClass({
  displayName: 'Navigation',
  getInitialState() {
    return {
      data: {},
      overlayOpen: false
    };
  },
  openOverlay(event) {
    this.setState({overlayOpen: true});
    this.refs.closeButton.anim();
  },
  closeOverlay(event) {
    this.setState({overlayOpen: false});
    this.refs.closeButton.resetAnim();
  },
  render() {
    const navigationLinks = this.props.data.map(function (link) {
      return (
        <NavigationLink key={link.url} url={link.url} colour={link.colour}>
          {link.title}
        </NavigationLink>
      );
    });
    const navigationOverlayLinks = this.props.data.map(function (link) {
      return (
        <NavigationOverlayLink key={link.url} url={link.url}>
          {link.title}
        </NavigationOverlayLink>
      );
    });
    const overlayClasses = this.state.overlayOpen ? 'nav__overlay u-text-center nav__overlay-open' : 'nav__overlay u-text-center nav__overlay-closed';
    const svgContent = '<use xlink:href="images/spritemap.svg#ustwologo" />';
    return (
      <header className="nav">
        <section>
          <nav className="nav">
            <div className="nav__logo">
              <a className="nav__logo__link" href="/">
                <svg className="nav__logo__graphic" title="ustwo logo" role="img" dangerouslySetInnerHTML={{__html: svgContent }} />
              </a>
            </div>
            <NavigationOpenOverlayButton onOpen={this.openOverlay} />
            <div className="nav__inner">
              <ul className="nav__menu">
                {navigationLinks}
              </ul>
              <hr className="nav__underline"/>
            </div>
            <div className={overlayClasses}>
              <NavigationOverlayCloseButton ref="closeButton" onClose={this.closeOverlay} />
              <ul className="nav__overlay__menu">
                {navigationOverlayLinks}
              </ul>
            </div>
          </nav>
        </section>
      </header>
    );
  }
});

export default Navigation;
