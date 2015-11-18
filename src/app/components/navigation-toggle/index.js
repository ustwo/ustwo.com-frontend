'use strict';

import React from 'react';

import SVG from 'app/components/svg';

const NavigationToggle = React.createClass({
  render() {
    return <button onClick={this.props.onOpen} className="navigation-toggle">
      <SVG title="Open menu" spritemapID="menuopen" />
    </button>;
  }
});

export default NavigationToggle;
