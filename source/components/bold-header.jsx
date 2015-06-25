'use strict';

import React from 'react';

import BoldHeaderSubtitle from '../atoms/bold-header-subtitle.jsx';

export default class BoldHeader extends React.Component {
  render() {
    const titleClass = `u-text-${this.props.colour}`;
    let subtitleMarkup = '';
    if (this.props.subtitle) {
      subtitleMarkup = <BoldHeaderSubtitle>{this.props.subtitle}</BoldHeaderSubtitle>
    }
    return (
      <header className="bold-page-header">
        <h1 className={titleClass}>{this.props.children}</h1>
        {subtitleMarkup}
      </header>
    );
  }
};
