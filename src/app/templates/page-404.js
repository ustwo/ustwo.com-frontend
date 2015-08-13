'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';

import Navigation from '../modules/navigation';

export default class page404 extends React.Component {
  render() {
    const pageData = this.props.page;
    return (
      <article className="page-404">

        <img src="/images/404.jpg" alt="404, Whoops nothing here" />

      </article>
    );
  }
}
