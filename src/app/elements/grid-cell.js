import React from 'react';
import get from 'lodash/object/get';

import Rimage from '../elements/rimage';

export default class GridCell extends React.Component {
  render() {
    const cell = this.props.cell;
    const images = get(cell, 'attr.image.value.0.sizes');
    return (
      <li className="grid-cell">
        <div className="card feature">
          <h2>{get(cell, 'attr.heading.value')}</h2>
          <p>{get(cell, 'attr.body.value')}</p>
        </div>
        <Rimage className="card image" sizes={images} wrap="div" />
      </li>
    );
  }
}
