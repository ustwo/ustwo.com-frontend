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

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    }
  }

  toggleMenu() {
    if (this.props.documentScrollPosition < window.innerHeight) {
      Scroll.animateScroll.scrollTo(window.innerHeight);
      Scroll.Events.scrollEvent.register('end', function(to, element) {
        if (this.state.menuOpen) {
          this.setState({ menuOpen: false });
          Flux.closeModal();
        } else {
          this.setState({ menuOpen: true });
          Flux.showNavOverlay();
        }
      }.bind(this));
    } else {
      if (this.state.menuOpen) {
        this.setState({ menuOpen: false });
        Flux.closeModal();
      } else {
        this.setState({ menuOpen: true });
        Flux.showNavOverlay();
      }
    }
  }

  render() {
    const { section, page, takeover, customClass, documentScrollPosition, whereIsVentures } = this.props;

    const navClasses = classnames('navigation', customClass, section, page, {
      takeover,
      sticky: documentScrollPosition > window.innerHeight ? true : false,
      invert: whereIsVentures && documentScrollPosition > whereIsVentures.from && documentScrollPosition < whereIsVentures.to ? true : false,
      menuOpen: this.state.menuOpen
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
