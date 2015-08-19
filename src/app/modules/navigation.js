'use strict';

import React from 'react';
import classnames from 'classnames';

import Flux from '../flux';
import Nulls from '../flux/nulls';

import Track from '../../server/adaptors/track';
import NavigationLink from '../elements/navigation-link';
import NavigationOverlayLink from '../elements/navigation-overlay-link';
import NavigationOpenOverlayButton from '../elements/navigation-open-overlay-button';
import CloseButton from '../elements/close-button';

export default class Navigation extends React.Component {
  openOverlay = (event) => {
    Flux.openNav();
    this.refs.closeButton.anim();
  }
  closeOverlay = (event) => {
    Flux.closeNav();
    this.refs.closeButton.resetAnim();
  }
  onClickLogo = (event) => {
    event.preventDefault();
    if (this.props.takeover !== Nulls.takeover) {
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'takeover',   // Required.
        'eventAction': 'click_ustwo_logo',  // Required.
        'eventLabel': this.props.takeover.name // Name of the takeover as set in WordPress
      });
    }
    Flux.navigate('/');
  }
  render() {
    const navigationLinks = this.props.pages.map((link) => {
      return (
        <NavigationLink key={link.id} url={link.url} colour={link.colour} onClick={this.closeOverlay} selected={link.id === this.props.section} external={link.external} gaId={link.ga}>
          {link.title}
        </NavigationLink>
      );
    });
    const navigationOverlayLinks = this.props.pages.map((link) => {
      return (
        <NavigationOverlayLink key={link.url} url={link.url} onClick={this.closeOverlay} selected={link.id === this.props.section} external={link.external}>
          {link.title}
        </NavigationOverlayLink>
      );
    });
    const overlayClasses = this.props.open ? 'nav__overlay nav__overlay-open' : 'nav__overlay nav__overlay-closed';
    const classes = classnames('nav', this.props.customClass);
    const svgContent = '<use xlink:href="/images/spritemap.svg#ustwologo" />';
    return (
      <header className={classnames('header', this.props.section, this.props.page, {
          'takeover': this.props.takeover
        })}>
        <nav className={classes}>
          <div className="nav__logo">
            <a className="nav__logo__link" href="/" onClick={this.onClickLogo}>
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
            <CloseButton ref="closeButton" onClose={this.closeOverlay} className="nav__overlay__close-button" />
            <ul className="nav__overlay__menu">
              {navigationOverlayLinks}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
};
