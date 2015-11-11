'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';

import Flux from '../../flux';

import NavigationOverlayLink from '../navigation-overlay-link';
import CloseButton from '../close-button';
import ModalContentMixin from '../../lib/modal-content-mixin';

const NavigationOverlay = React.createClass({
  mixins: [ModalContentMixin],
  onClickClose() {
    Flux.closeModal();
  },
  renderNavigationOverlayLinks() {
    return get(this.props, 'pages', []).map(link => {
      return <NavigationOverlayLink
        key={link.id}
        url={link.slug === 'home' ? '/' : `/${link.slug}`}
        selected={link.slug === this.props.section}
      >
        {link.title}
      </NavigationOverlayLink>;
    });
  },
  render() {
    return <nav className="navigation-overlay" onClick={onClickContent}>
      <CloseButton onClose={this.onClickClose} autoAnim={10} />
      <ul className="menu">
        {this.renderNavigationOverlayLinks()}
      </ul>
    </nav>;
  }
});

export default NavigationOverlay;
