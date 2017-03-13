import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';

import Track from 'app/adaptors/server/track';
import Flux from 'app/flux';

import ModalContentMixin from 'app/lib/modal-content-mixin';

function tempChangeWorkName(slug) {
  return slug === 'what-we-do' ? 'work' : slug
}

const NavigationOverlay = React.createClass({

  mixins: [ModalContentMixin],

  getInitialState() {
    return {
      hoveredItem: ''
    };
  },

  mouseEnter(name) {
    this.setState({
      hoveredItem: name
    });
  },

  mouseLeave(currentPage) {
    this.setState({
      hoveredItem: currentPage
    });
  },

  onClick(url) {
    return (e) => {
      e.preventDefault();
      this.onClick && this.onClick();
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'nav',   // Required.
        'eventAction': 'click_nav_link',     // Required.
      });
      Flux.navigate(url);
      Flux.closeModal();
    }
  },

  renderNavigationOverlayLinks() {
    return get(this.props, 'pages', []).map(link => {
      const slug = tempChangeWorkName(link.slug);
      const url = slug === 'home' ? '/' : `/${slug}`;
      const mouseOver = url === '/' ? 'home' : url.slice(1);
      const classes = classnames('navigation-overlay-link', {
        selected: slug === this.props.section
      });


      return (
        <li className={classes} key={link.id}>
          <a
            href={url}
            onClick={this.onClick(url).bind(this)}
            onMouseEnter={() => this.mouseEnter(mouseOver)}
            onMouseLeave={() => this.mouseLeave(this.props.section)}
          >
            {link.title === 'What We Do' ? 'Work' : link.title}
          </a>
        </li>
      );

    });
  },

  renderBg() {
    return get(this.props, 'pages', []).map(link => {
      const slug = tempChangeWorkName(link.slug);

      const classes = classnames('navigation-overlay-bg', `navigation-overlay-bg-${slug}`, {
        hovered: slug === this.state.hoveredItem
      })
      return (
        <div className={classes}></div>
      );
    });
  },

  render() {
    const classes = classnames('navigation-overlay', this.props.section, `navigation-hover-${this.state.hoveredItem}`);

    return (
      <nav className={classes} onClick={this.onClickContent}>
        <ul className="menu-items">
          {this.renderNavigationOverlayLinks()}
        </ul>
        {this.renderBg()}
      </nav>
    );
  }
});

export default NavigationOverlay;
