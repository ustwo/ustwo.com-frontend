'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';

import Flux from '../../flux';

import NavigationOverlayLink from '../navigation-overlay-link';
import CloseButton from '../close-button';
import {onClickContent} from '../modal';

export default class NavigationOverlay extends React.Component {
  render() {
    return (
      <nav className='navigation-overlay' onClick={onClickContent}>
        <CloseButton onClose={this.onClickClose} autoAnim={10} />
        <ul className="menu">
          {this.renderNavigationOverlayLinks()}
        </ul>
      </nav>
    );
  }
  renderNavigationOverlayLinks = () => {
    return get(this.props, 'pages', []).map(link => {
      return (
        <NavigationOverlayLink key={link.id} url={link.slug === 'home' ? '/' : `/${link.slug}`} selected={link.slug === this.props.section}>
          {link.title}
        </NavigationOverlayLink>
      );
    });
  }
  onClickClose() {
    Flux.closeModal();
  }
}
