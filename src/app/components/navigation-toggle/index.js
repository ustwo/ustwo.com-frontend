'use strict';

import React from 'react';

import SVG from '../svg';

export default class NavigationToggle extends React.Component {
  render() {
    return (
      <button onClick={this.props.onOpen} className="navigation-toggle">
        <SVG title="Open menu" spritemapID='menuopen' />
      </button>
    );
  }
};
