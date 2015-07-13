'use strict';

import React from 'react';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import Timeline from 'gsap/src/uncompressed/TimelineLite';

function wrapWords (word, index, array) {
  return word === '<br/>' ? word : <span key={`word${index}`} className="word">{index === array.length - 1 ? word : `${word} `}</span>;
}

export default class WordAnimation extends React.Component {
  render() {
    const text = this.props.children.split(' ').map(wrapWords);
    return <span className="word-animator">{text}</span>;
  }
  componentDidMount() {
    const words = [].filter.call(React.findDOMNode(this).children, element => element.className === "word");
    const timeline = new Timeline({delay: this.props.delay});
    timeline.add(TweenMax.staggerFrom(words, this.props.duration, this.props.options, this.props.duration / words.length));
  }
};
