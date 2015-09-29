'use strict';

import React from 'react';

import spannify from '../../lib/spannify';

export default class WordAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.timeline = new TimelineLite({ delay: props.delay });
    this.state = {
      animationShown: false
    }
  }
  componentWillMount() {
    if (this.props.children) {
      this.text = spannify(this.props.children, 'word');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.text && nextProps.children) {
      this.text = spannify(nextProps.children, 'word');
    }
  }
  componentDidMount() {
    if (this.text) {
      this.startAnimation();
    }
  }
  componentDidUpdate() {
    if (!this.state.animationShown && this.text) {
      this.startAnimation();
    }
  }
  startAnimation = () => {
    const props = this.props;
    const words = React.findDOMNode(this).children;
    if (!this.state.animationShown && words.length) {
      this.timeline.add(TweenMax.staggerFrom(words, props.duration, props.options, props.duration / words.length));
      this.setState({
        animationShown: true
      });
    }
  }
  render() {
    return <span className="word-animator">{this.text}</span>;
  }
};
