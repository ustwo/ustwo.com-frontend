import React, { Component } from 'react';
import classnames from 'classnames';
import Scroll from 'react-scroll';

import Flux from 'app/flux';
import Nulls from 'app/flux/nulls';

import window from 'app/adaptors/server/window';
import Track from 'app/adaptors/server/track';
import SVG from 'app/components/svg';
import FramesUstwoLogo from 'app/components/frames-ustwo-logo';

class Navigation extends Component {

  toggleMenu() {
    if (this.props.documentScrollPosition < window.innerHeight && this.props.section === 'home') {
      Scroll.animateScroll.scrollTo(window.innerHeight);
      Scroll.Events.scrollEvent.register('end', () => {
        if (this.props.modal === 'menu') {
          Flux.closeModal();
        } else {
          Flux.showNavOverlay();
        }
      });
    } else {
      if (this.props.modal === 'menu') {
        Flux.closeModal();
      } else {
        Flux.showNavOverlay();
      }
    }
  }

  render() {
    const { section, page, takeover, customClass, documentScrollPosition, venturesPosition } = this.props;

    const venturesActive = venturesPosition && (documentScrollPosition > venturesPosition.from) && (documentScrollPosition < venturesPosition.to);

    const navClasses = classnames('navigation', customClass, section, page, {
      notSticky: documentScrollPosition < window.innerHeight && section === 'home',
      invert: venturesActive,
      menuOpen: this.props.modal === 'menu',
      takeover
    });

    return (
      <nav className={navClasses} onClick={this.toggleMenu.bind(this)}>
        <button className="logo">
          <SVG title="ustwo logo" spritemapID="ustwologo" />
        </button>
        <button className="navigation-toggle">
          <div className="navigation-toggle-main"></div>
          <SVG title="Menu ring" spritemapID="menu-ring" className="navigation-toggle-ring" />
        </button>
      </nav>
    );
  }
};

export default Navigation;
