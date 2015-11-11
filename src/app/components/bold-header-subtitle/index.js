'use strict';

import React from 'react';

const BoldHeaderSubtitle = React.createClass({
  render() {
    return <section>
      <hr />
      <h4 className="u-text-nonblack">{this.props.children}</h4>
    </section>;
  }
});

export default BoldHeaderSubtitle;
