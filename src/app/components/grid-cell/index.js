import React from 'react';
import { get } from 'lodash';

import Rimage from 'app/components/rimage';

const GridCell = React.createClass({
  render() {
    const cell = this.props.cell;
    const sizes = get(cell, 'attr.image.value.0.sizes');
    const altText = get(cell, 'attr.image.value.0.alt');

    return <li className="grid-cell">
      <Rimage
        className="card image"
        sizes={sizes}
        altText={altText}
        wrap="div"
      />
      <div className="card feature">
        <h3>{get(cell, 'attr.heading.value')}</h3>
        <p>{get(cell, 'attr.body.value')}</p>
      </div>
    </li>;
  }
});

export default GridCell;
