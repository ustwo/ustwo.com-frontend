'use strict';

import React from 'react';
import classnames from 'classnames';
import TransitionManager from 'react-transition-manager';

export default class Rotator extends React.Component {
  static defaultProps = {
    delay: 0,
    interval: 1000,
    duration: 300,
    keep: 1
  }
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.timeout = setTimeout(() => {
      this.interval = setInterval(this.tick, this.props.interval);
    }, this.props.delay);
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
    for (let i = this.props.keep; i > 0 ; i--) {
      indices.push(this.normaliseIndex(this.state.index + i - 1));
    }
    return (
      <TransitionManager component="div" className={classes} {...this.props}>
        {indices.map(index => this.props.children[index])}
      </TransitionManager>
    );
  }
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
  }
};
