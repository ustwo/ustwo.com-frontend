'use strict';

import React from 'react';

const HomeTextBlock = React.createClass({
  render() {
    const { title, children } = this.props;
    const colour = this.props.colour || 'white';
    const textStyles = {
      color: colour
    };
    const bgStyles = {
      backgroundColor: colour
    };
    return <div className="home-text-block" style={textStyles}>
      <hr style={bgStyles} />
      <h2 className="h3">{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </div>;
  }
});

export default HomeTextBlock;
