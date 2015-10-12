import React from 'react';
import classnames from 'classnames';

export default class LoadingIcon extends React.Component {
  render() {
    return (
      <div className={classnames("loading-icon", this.props.className)}>
				<span className="half left">
          <span className="bg"></span>
        </span>
				<span className="half right">
          <span className="bg"></span>
        </span>
      </div>
    );
  }
}
