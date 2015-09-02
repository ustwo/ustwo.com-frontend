'use strict';

import React from 'react';
import Flux from '../flux';

import LoadingIcon from '../elements/loading-icon';

export default class BlogLoader extends React.Component {
  render() {
    return (
      <div className="blog-loader">
        <LoadingIcon />
      </div>
    );
  }
};
