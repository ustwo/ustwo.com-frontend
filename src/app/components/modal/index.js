import React from 'react';
import classnames from 'classnames';

import Flux from 'app/flux';

const Modal = React.createClass({
  onClick() {
    Flux.closeModal();
  },
  render() {
    const { className, belowHeader, children } = this.props;
    const classes = classnames('modal', className.replace('shown',''), {
      'below-header': belowHeader
    });
    return <div
      className={classes}
      onClick={this.onClick}
    >
      {children}
    </div>;
  }
});

export default Modal;
