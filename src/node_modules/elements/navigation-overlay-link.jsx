'use strict';

import React from 'react';

export default class NavigationOverlayLink extends React.Component {
  render() {
    return (
      <li className="h3 nav__overlay__menu__item">
          <a href={this.props.url} className="">{this.props.children}</a>
      </li>
    );
  }
};
