'use strict';

import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';

import Flux from 'app/flux';

import NavigationOverlayLink from 'app/components/navigation-overlay-link';
import CloseButton from 'app/components/close-button';
import ModalContentMixin from 'app/lib/modal-content-mixin';

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
    return <nav className="navigation-overlay" onClick={this.onClickContent}>
      <CloseButton onClose={this.onClickClose} autoAnim={10} />
      <ul className="menu">
        {this.renderNavigationOverlayLinks()}
      </ul>
    </nav>;
  }
});

export default NavigationOverlay;
