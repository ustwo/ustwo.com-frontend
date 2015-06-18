'use strict';

import React from 'react';

const NavigationLink = React.createClass({
  render() {
    const classes = 'nav__menu__item__link u-bar-after--' + this.props.colour;
    return (
      <li className="nav__menu__item">
        <a href={this.props.url} className={classes}>{this.props.children}</a>
      </li>
    );
  }
});

export default NavigationLink;
