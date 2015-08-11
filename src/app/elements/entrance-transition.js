'use strict';

import React from 'react';
import classnames from 'classnames';

export default class EntranceTransition extends React.Component {
  render() {
    const classes = classnames('entrance-transition', this.props.className);
    return <div className={classes}>{this.props.children}</div>;
  }
  componentDidMount() {
    this.heroTimeout = setTimeout(() => {
      React.findDOMNode(this).classList.add('show');
    }, 100);
  }
};
