'use strict';

import React from 'react';

export default class HomeTextBlock extends React.Component {
  render() {
    return (
      <section className="home-text-block">
        <hr/>
        <h2 className="h3">{this.props.title}</h2>
        {this.props.children}
      </section>
    );
  }
};
