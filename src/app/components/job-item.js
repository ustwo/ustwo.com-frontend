'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import Flux from '../flux';

export default class JobItem extends React.Component {
  render() {
    const classes = classnames('job-item', {
    });
    return (
      <li className={classes}>
        <h4>Lead Visual Designer</h4>
        <div className="job-description">
          <p>Emmental cheeseburger pepper jack. Everyone loves blue castello smelly cheese swiss pecorino cheese strings who moved my cheese cheese on toast. Melted cheese cheese triangles cheese on toast goat red leicester emmental boursin cheese on toast. Jarlsberg who moved my cheese parmesan smelly cheese cauliflower cheese mozzarella.</p>
          <a href="/">Read full description</a>
        </div>
      </li>
    );
  }
}
