'use strict';

import React from 'react';
import Highlight from 'react-highlight'

const CodeHighlighter = React.createClass({
  render() {
    const {code, language} = this.props;
    return (
      <Highlight className={language}>
        {code}
      </Highlight>
    )
  }
});

export default CodeHighlighter;
