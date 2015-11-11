'use strict';

import React from 'react';

const SVG = React.createClass({
  render() {
    const { className, role, title, spritemapID, style } = this.props;
    return <svg
      className={className}
      role={role || 'img'}
      title={title}
      dangerouslySetInnerHTML={{
        __html: `<title>${title}</title><use xlink:href='/images/spritemap.svg#${spritemapID}' />`
      }}
      style={style}
    />;
  }
});

export default SVG;
