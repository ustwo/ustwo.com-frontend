'use strict';

import React from 'react';

import spannify from '../_lib/spannify';

export default class WordAnimation extends React.Component {
  componentWillMount() {
    const props = this.props;
    if (props.children) {
      this.text = spannify(props.children, 'word');
    }
  }
  componentDidMount() {
    const props = this.props;
    const words = [].filter.call(React.findDOMNode(this).children, element => element.className === "word");
    // console.log('children', React.findDOMNode(this).children);
    this.timeline = new TimelineLite({delay: props.delay});
    if (words.length) {
      this.timeline.add(TweenMax.staggerFrom(words, props.duration, props.options, props.duration / words.length));
      this.animationShown = true;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.text && nextProps.children) {
      this.text = spannify(nextProps.children, 'word');
    }
  }
  componentDidUpdate() {
    const props = this.props;
    const words = [].filter.call(React.findDOMNode(this).children, element => element.className === "word");
    if (!this.animationShown && words.length) {
      this.timeline.add(TweenMax.staggerFrom(words, props.duration, props.options, props.duration / words.length));
      this.animationShown = true;
    }
  }
  render() {
    return <span className="word-animator">{this.text}</span>;
  }
};
