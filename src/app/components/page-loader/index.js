'use strict';

import React from 'react';
import classnames from 'classnames';

import LoadingIcon from '../loading-icon';

const PageLoader = React.createClass({
  render() {
    const props = this.props;
    return (
      <section className={classnames("page-loader", props.className)}>
        <LoadingIcon />
      </section>
    );
  }
});

export default PageLoader;
