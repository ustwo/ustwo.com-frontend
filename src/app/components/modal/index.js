import React, { Component } from 'react';
import classnames from 'classnames';

import Flux from 'app/flux';

class Modal extends Component {

  onClick() {
    Flux.closeModal();
  }

  render() {
    const { className, belowHeader, children } = this.props;
    const classes = classnames('modal', className.replace('shown',''), {
      'below-header': belowHeader
    });

    return (
      <div className={classes} onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
};

export default Modal;
