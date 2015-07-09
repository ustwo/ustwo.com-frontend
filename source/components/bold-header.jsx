'use strict';

import React from 'react';

import BoldHeaderSubtitle from '../elements/bold-header-subtitle.jsx';

export default class BoldHeader extends React.Component {
  render() {
    const titleClass = `u-text-${this.props.colour}`;
    let subtitleMarkup = '';
    if (this.props.subtitle) {
      subtitleMarkup = <BoldHeaderSubtitle>{this.props.subtitle}</BoldHeaderSubtitle>
    }
    return (
      <header className="bold-header">
        <h1 className={titleClass} ref="title">{this.props.children}</h1>
        {subtitleMarkup}
      </header>
    );
  }
};
