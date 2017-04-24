import React, { Component } from 'react';

class SVG extends Component {
  render() {
    const { className, role, title, spritemapID, style, viewBox } = this.props;
    return (
      <svg
        className={className}
        role={role || 'img'}
        title={title}
        style={style}
        viewBox={viewBox}
      >
        <title>{title}</title>
        <use xlinkHref={`/images/spritemap.svg#${spritemapID}`} />
      </svg>
    );
  }
};

export default SVG;
