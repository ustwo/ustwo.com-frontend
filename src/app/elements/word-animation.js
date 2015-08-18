'use strict';

import React from 'react';

function wrapWords (word, index, array) {
  return <span key={`word${index}`} className="word">{index === array.length - 1 ? word : `${word} `}</span>;
}

export default class WordAnimation extends React.Component {
  componentDidMount() {
    const props = this.props;
    const words = [].filter.call(React.findDOMNode(this).children, element => element.className === "word");
    const timeline = new TimelineLite({delay: props.delay});
    timeline.add(TweenMax.staggerFrom(words, props.duration, props.options, props.duration / words.length));
  }
  render() {
    const children = this.props.children;
    const text = children && children.split(' ').map(wrapWords);
    return <span className="word-animator">{text}</span>;
  }
};
