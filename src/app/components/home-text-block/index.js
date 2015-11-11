'use strict';

import React from 'react';

const HomeTextBlock = React.createClass({
  render() {
    const { title, children } = this.props;
    const colour = this.props.colour || 'white';
    const childColour = this.props.childColour || 'white';
    const hrClasses = `u-bg-${colour}`;
    const titleClasses = `h3 u-text-${colour}`;
    const childClasses = `u-text-${childColour}`;
    return <div className="home-text-block">
      <hr className={hrClasses}/>
      <h2 className={titleClasses}>{title}</h2>
      <div className={childClasses}>
        {children}
      </div>
    </div>;
  }
});

export default HomeTextBlock;
