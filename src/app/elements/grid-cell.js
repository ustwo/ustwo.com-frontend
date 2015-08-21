import React from 'react';
import get from 'lodash/object/get';

export default class GridCell extends React.Component {
  render() {
    const cell = this.props.cell;
    const image = get(cell, 'attr.image.value.0.url');
    return (
      <li className="grid-cell">
        <div className="card feature">
          <h2>{get(cell, 'attr.heading.value')}</h2>
          <p>{get(cell, 'attr.body.value')}</p>
        </div>
        <div className="card image" style={{backgroundImage: `url('${image}')`}}>
          <img className="image__image" src={image} />
        </div>
      </li>
    );
  }
}
