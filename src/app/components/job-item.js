'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import Flux from '../flux';

export default class JobItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  onClickJobItem = () => {
    const el = React.findDOMNode(this);
    const description = React.findDOMNode(this.refs.description);
    const newHeight = this.state.open ? (el.clientHeight - description.clientHeight) : (el.clientHeight + description.clientHeight);
    el.style.height = `${newHeight}px`;
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    const classes = classnames('job-item', {
      open: this.state.open
    });
    return (
      <li className={classes} onClick={this.onClickJobItem}>
        <h4>Lead Visual Designer</h4>
        <div ref='description' className="job-description">
          <p>Emmental cheeseburger pepper jack. Everyone loves blue castello smelly cheese swiss pecorino cheese strings who moved my cheese cheese on toast. Melted cheese cheese triangles cheese on toast goat red leicester emmental boursin cheese on toast. Jarlsberg who moved my cheese parmesan smelly cheese cauliflower cheese mozzarella.</p>
          <a href="/">Read full description</a>
        </div>
      </li>
    );
  }
}
