'use strict';

import React from 'react';

export default class HomeTextBlock extends React.Component {
  render() {
    const colour = this.props.colour || 'white';
    const childColour = this.props.childColour || 'white';
    const hrClasses = `u-bg-${colour}`;
    const titleClasses = `h3 u-text-${colour}`;
    const childClasses = `u-text-${childColour}`;
    return (
      <section className="home-text-block">
        <hr className={hrClasses}/>
        <h2 className={titleClasses}>{this.props.title}</h2>
        <div className={childClasses}>
          {this.props.children}
        </div>
      </section>
    );
  }
};
