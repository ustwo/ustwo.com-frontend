'use strict';

import React from 'react';

const HomeTextBlock = React.createClass({
  displayName: 'HomeTextBlock',
  render() {
    return (
      <section className="home-text-block">
        <hr/>
        <h2 className="h3">{this.props.title}</h2>
        {this.props.children}
      </section>
    );
  }
});

export default HomeTextBlock;
