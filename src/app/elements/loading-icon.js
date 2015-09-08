import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';

export default class LoadingIcon extends React.Component {
  render() {
    return (
      <div className={classnames("loading-icon", this.props.className)}>
        <div className="wrapper">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="opposite">
          <div></div>
        </div>
      </div>
    );
  }
}
