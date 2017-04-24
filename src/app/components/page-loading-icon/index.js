import React from 'react';
import classnames from 'classnames';

const LoadingIcon = React.createClass({
  render() {
    return (
      <div className={classnames("page-loading-icon", this.props.className, this.props.pageId)}>
        <div></div>
        <div></div>
      </div>
    );
  }
});

export default LoadingIcon;
