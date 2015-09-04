'use strict';

import React from 'react';

export default class SVG extends React.Component {
  render() {
    const props = this.props;
    return (
      <svg
        className={props.className}
        role={props.role || 'img'}
        title={props.title}
        dangerouslySetInnerHTML={{
          __html: `<use xlink:href='/images/spritemap.svg#${props.spritemapID}' />`
        }}
        style={props.style}
      />
    );
  }
}
