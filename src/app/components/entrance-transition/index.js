import React, { Component } from 'react';
import classnames from 'classnames';

class EntranceTransition extends Component {
  render() {
    const classes = classnames('entrance-transition', this.props.className);

    return (
      <div className={classes}>{this.props.children}</div>
    );
  }
};

export default EntranceTransition;
