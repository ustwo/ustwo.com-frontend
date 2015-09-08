'use strict';

import React from 'react';

function wrapWords (word, index, array) {
  return <span key={`word${index}`} className="word">{index === array.length - 1 ? word : `${word} `}</span>;
}

export default class WordAnimation extends React.Component {
  componentWillMount() {
    const props = this.props;
    if (props.children) {
      this.text = props.children.split(' ').map(wrapWords);
    }
  }
  componentDidMount() {
    const props = this.props;
    const words = [].filter.call(React.findDOMNode(this).children, element => element.className === "word");
    console.log('children', React.findDOMNode(this).children);
    this.timeline = new TimelineLite({delay: props.delay});
    if (words.length) {
      this.timeline.add(TweenMax.staggerFrom(words, props.duration, props.options, props.duration / words.length));
      this.animationShown = true;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.text && nextProps.children) {
      this.text = nextProps.children.split(' ').map(wrapWords);
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
