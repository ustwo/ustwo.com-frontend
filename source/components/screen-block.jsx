'use strict';

import React from 'react';

export default class ScreenBlock extends React.Component {
  render() {
    const classes = this.props.hexColour ? 'screen-block' : `screen-block u-bg-${this.props.colour}`;
    const hexBackground = this.props.hexColour ? {backgroundColor: this.props.hexColour} : {};
    return (
      <section className={classes} style={hexBackground}>
        {this.props.children}
      </section>
    );
  }
};
