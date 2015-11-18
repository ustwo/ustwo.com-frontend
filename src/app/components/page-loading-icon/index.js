import React from 'react';
import classnames from 'classnames';

const LoadingIcon = React.createClass({
  render() {
    return <ul className={classnames("page-loading-icon", this.props.className, this.props.pageId)}>
      <li><div></div></li>
      <li><div></div></li>
      <li><div></div></li>
      <li><div></div></li>
    </ul>;
  }
});

export default LoadingIcon;
