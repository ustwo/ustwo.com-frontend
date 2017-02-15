'use strict';

import React from 'react';
import Highlight from 'react-highlight'

const CodeHighlighter = React.createClass({
  render() {
    const {code} = this.props;
    return (
      <Highlight>
        {code}
      </Highlight>
    )
  }
});

export default CodeHighlighter;
