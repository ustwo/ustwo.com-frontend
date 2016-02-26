'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';

import Flux from 'app/flux';
import Nulls from 'app/flux/nulls';

import Track from 'app/adaptors/server/track';
import SVG from 'app/components/svg';
import NavigationLink from 'app/components/navigation-link';
import NavigationToggle from 'app/components/navigation-toggle';

const Navigation = React.createClass({
  getInitialState() {
    return {
      'scrolled': false
    }
  },
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
  addHeaderBackground() {
    const { page, section } = this.props;
    const headerHeight = 68; // css: height of header is 68px
    let amount;
    if (section === 'blog') {
      amount = innerHeight - (innerHeight * .14) - headerHeight; // css: content on /blog is pushed up 14vh
      if (page === 'post') {
        amount = 450 - 70 - headerHeight; // css: height of blog post hero is 450px and it's pushed up 70px
      }
    } else {
      amount = innerHeight - headerHeight;
    }
    this.setState({
      'scrolled': window.scrollY > amount ? true : false
    });
  },
  componentDidMount() {
    const { section } = this.props;
    if (section !== 'home') {
      window.addEventListener('scroll', this.addHeaderBackground);
    }
  },
  componentWillReceiveProps(nextProps) {
    const { section } = nextProps;
    window.removeEventListener('scroll', this.addHeaderBackground);
    this.setState({
      'scrolled': false
    });
    if (section !== 'home') {
      window.addEventListener('scroll', this.addHeaderBackground);
    }
  },
  render() {
    const { section, page, takeover, customClass } = this.props;
    const headerClasses = classnames('header', section, page, {
      'takeover': takeover,
      'scrolled': this.state.scrolled
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
