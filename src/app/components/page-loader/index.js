'use strict';

import React from 'react';
import classnames from 'classnames';

import PageLoadingIcon from '../page-loading-icon';

const PageLoader = React.createClass({
  render() {
    const props = this.props;
    return (
      <section className={classnames("page-loader", props.className)}>
        <PageLoadingIcon />
      </section>
    );
  }
});

export default PageLoader;
