'use strict';

import React from 'react';
import classnames from 'classnames';
import TransitionManager from '../tm/index';

export default class Rotator extends React.Component {
  static defaultProps = {
    interval: 1000,
    duration: 300,
    keep: 1
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.interval = setInterval(this.tick, this.props.interval);
  }
  tick = () => {
    this.setState({
      index: this.normaliseIndex(this.state.index + 1)
    });
  }
  normaliseIndex = (index) => {
    return index % this.props.children.length;
  }
  render = () => {
    const classes = classnames('rotator', this.props.className);
    let indices = [];
    for (let i = 0; i < this.props.keep; i++) {
      indices.push(this.normaliseIndex(this.state.index + i));
    }
    return (
      <TransitionManager component="div" className={classes} {...this.props}>
        {indices.map(index => this.props.children[index])}
      </TransitionManager>
    );
  }
  componentWillUnmount = () => {
    clearInterval(this.interval);
  }
};
