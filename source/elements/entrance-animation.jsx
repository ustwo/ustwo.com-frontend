'use strict';

import React from 'react';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import Timeline from 'gsap/src/uncompressed/TimelineLite';

export default class WordAnimator extends React.Component {
  render() {
    return <div className="entrance-animation">{this.props.children}</div>;
  }
  componentDidMount() {
    let element = React.findDOMNode(this);
    const timeline = new Timeline({delay: this.props.delay});
    if (this.props.findElement) {
      element = this.props.findElement(element);
    }
    timeline.add(TweenMax.from(element, this.props.duration, this.props.options));
  }
};
