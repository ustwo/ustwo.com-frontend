'use strict';

import React from 'react';
import flatten from 'lodash/array/flatten';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import Timeline from 'gsap/src/uncompressed/TimelineLite';

function prepareChildren (child) {
  return React.isValidElement(child) ? child : child.replace('<br/>', ' <br/> ').split(' ').map(wrapWords);
}
function wrapWords (word, index, array) {
  return word === '<br/>' ? word : <span className="word">{index === array.length - 1 ? word : `${word} `}</span>;
}

export default class WordAnimator extends React.Component {
  render() {
    const text = flatten(this.props.children.map(prepareChildren));
    return <span className="word-animator">{text}</span>;
  }
  componentDidMount() {
    const words = [].filter.call(React.findDOMNode(this).children, element => element.className === "word");
    const timeline = new Timeline({delay: this.props.delay});
    timeline.add(TweenMax.staggerFrom(words, this.props.duration, this.props.options, this.props.duration / words.length));
  }
};
