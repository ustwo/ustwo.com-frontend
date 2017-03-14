import React, { Component } from 'react';
import classnames from 'classnames';

import PageLoadingIcon from 'app/components/page-loading-icon';

class PageLoader extends Component {
  render() {
    const { pageId, className } = this.props;
    const classes = classnames('page-loader', `loading-${pageId}`, className);
    return (
      <div className={classes}>
        <div className="page-loader-icon">
          <img src="/images/page-loader-placeholder.gif" />
        </div>
      </div>
    );
  }
};

export default PageLoader;
