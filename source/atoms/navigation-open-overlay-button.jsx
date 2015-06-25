'use strict';

import React from 'react';

export default class NavigationOpenOverlayButton extends React.Component {
  render() {
    const svgContent = '<use xlink:href="images/spritemap.svg#menuopen" />';
    return (
      <button onClick={this.props.onOpen} className="nav__open-overlay-button">
        <svg title="Open menu" role="img" width="24px" height="31px" dangerouslySetInnerHTML={{__html: svgContent }} />
      </button>
    );
  }
};
