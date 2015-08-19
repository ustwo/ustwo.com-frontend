import React from 'react';
import map from 'lodash/collection/map';
import omit from 'lodash/object/omit';

import Rimage from '../elements/rimage';

function getSizesArray(sizesObject) {
  return map(omit(sizesObject, 'thumbnail'), (size, name) => {
    size.name = name;
    return size;
  });
}

export default class FullImage extends React.Component {
  render() {
    return <Rimage className="full-image" sizes={getSizesArray(this.props.sizes)} background={true} />;
  }
}
