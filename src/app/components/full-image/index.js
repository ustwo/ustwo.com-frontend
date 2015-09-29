import React from 'react';

import Rimage from '../rimage';

export default class FullImage extends React.Component {
  render() {
    return <Rimage className="full-image" sizes={this.props.sizes} wrap="section" />;
  }
}
