'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';

import Flux from '../flux';
import Nulls from '../flux/nulls';

import Track from '../../server/adaptors/track';
import NavigationLink from '../elements/navigation-link';
import NavigationOpenOverlayButton from '../elements/navigation-open-overlay-button';

export default class Navigation extends React.Component {
  openOverlay() {
    Flux.showNavOverlay();
  }
  onClickLogo = (event) => {
    const takeover = this.props.takeover;
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
    const props = this.props;
    const headerClasses = classnames('header', props.section, props.page, { 'takeover': props.takeover });
    const svgContent = '<use xlink:href="/images/spritemap.svg#ustwologo" />';
    return (
      <header className={headerClasses}>
        <nav className={classnames('nav', props.customClass)}>
          <div className="nav__logo">
            <a className="nav__logo__link" href="/" onClick={this.onClickLogo}>
              <svg className="nav__logo__graphic" title="ustwo logo" role="img" dangerouslySetInnerHTML={{__html: svgContent }} />
            </a>
          </div>
          <NavigationOpenOverlayButton onOpen={this.openOverlay} />
          <div className="nav__inner">
            <ul className="nav__menu">
              {this.renderNavigationLinks()}
            </ul>
            <hr className="nav__underline"/>
          </div>
        </nav>
      </header>
    );
  }
  renderNavigationLinks = () => {
    return get(this.props, 'pages', []).map(link => {
      return (
        <NavigationLink key={link.id} url={link.slug === 'home' ? '/' : `/${link.slug}`} colour={link.colour} selected={link.slug === this.props.section} gaId={link.ga}>
          {link.title}
        </NavigationLink>
      );
    });
  }
};
