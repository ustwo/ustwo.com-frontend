'use strict';

import React from 'react';
import classnames from 'classnames';

import LoadingIcon from '../loading-icon';

export default class PageLoader extends React.Component {
  render() {
    const props = this.props;
    return (
      <section className={classnames("page-loader", props.className)}>
        <LoadingIcon />
      </section>
    );
  }
}
