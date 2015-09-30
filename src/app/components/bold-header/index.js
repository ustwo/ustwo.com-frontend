'use strict';

import React from 'react';

import BoldHeaderSubtitle from '../bold-header-subtitle';

export default class BoldHeader extends React.Component {
  render() {
    const titleClass = `u-text-${this.props.colour}`;
    let subtitleMarkup = '';
    if (this.props.subtitle) {
      subtitleMarkup = <BoldHeaderSubtitle>{this.props.subtitle}</BoldHeaderSubtitle>
    }
    const classes = `bold-header ${this.props.customClass}`;
    return (
      <header className={classes}>
        <h1 className={titleClass} ref="title">
          {this.props.children}
        </h1>
        {subtitleMarkup}
      </header>
    );
  }
};
