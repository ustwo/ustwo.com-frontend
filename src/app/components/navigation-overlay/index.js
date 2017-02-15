import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';

import Flux from 'app/flux';

import NavigationOverlayLink from 'app/components/navigation-overlay-link';
import ModalContentMixin from 'app/lib/modal-content-mixin';

const NavigationOverlay = React.createClass({

  mixins: [ModalContentMixin],

  renderNavigationOverlayLinks() {
    return get(this.props, 'pages', []).map(link => {
      return (
        <NavigationOverlayLink
          key={link.id}
          url={link.slug === 'home' ? '/' : `/${link.slug}`}
          selected={link.slug === this.props.section}
        >
          {link.title}
        </NavigationOverlayLink>
      );
    });
  },

  render() {
    const classes = classnames('navigation-overlay', this.props.section);

    return (
      <nav className={classes} onClick={this.onClickContent}>
        <ul className="menu-items">
          {this.renderNavigationOverlayLinks()}
        </ul>
      </nav>
    );
  }
});

export default NavigationOverlay;
