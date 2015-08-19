import React from 'react';

export default class GridCell extends React.Component {
  render() {
    const cell = this.props.cell
    return (
      <li className="grid-cell">
        <div className="card feature">
          <h2>{cell.attr.heading.value}</h2>
          <p>{cell.attr.body.value}</p>
        </div>
        <div className="card image" style={{backgroundImage: `url('${cell.attr.image.value[0].url}')`}}>
          <img className="image__image" src={cell.attr.image.value[0].url} />
        </div>
      </li>
    );
  }
}
