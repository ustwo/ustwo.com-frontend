import React from 'react';

import Rimage from '../elements/rimage';

export default class FullImage extends React.Component {
  render() {
    return <Rimage className="full-image" sizes={this.props.sizes} wrap="section" />;
  }
}
