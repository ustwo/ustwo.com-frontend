'use strict';

import React from 'react';

export default class BoldHeaderSubtitle extends React.Component {
  render() {
    return (
      <section>
        <hr/>
        <h4 className="u-text-nonBlack">{this.props.children}</h4>
      </section>
    );
  }
};
