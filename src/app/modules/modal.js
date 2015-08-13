import React from 'react';
import classnames from 'classnames';

import Flux from '../flux';

class Modal extends React.Component {
  render() {
    return (
      <div className={classnames('modal', this.props.className, {
          "below-header": this.props.belowHeader
        })} onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
  onClick() {
    Flux.closeModal();
  }
};
Modal.onClickContent = (e) => {
  e.stopPropagation();
};

export default Modal;
