'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import spannify from 'app/lib/spannify';
import animate from 'app/lib/animate';

const WordAnimation = React.createClass({
  getInitialState() {
    return {
      animationShown: false
    }
  },
  componentWillMount() {
    if (this.props.children) {
      this.text = spannify(this.props.children, 'word');
    }
  },
  componentWillReceiveProps(nextProps) {
    if (!this.text && nextProps.children) {
      this.text = spannify(nextProps.children, 'word');
    }
  },
  componentDidMount() {
    if (this.text) {
      this.startAnimation();
    }
  },
  componentDidUpdate() {
    if (!this.state.animationShown && this.text) {
      this.startAnimation();
    }
  },
  startAnimation() {
    const props = this.props;
    const words = ReactDOM.findDOMNode(this).children;
    if (!this.state.animationShown && words.length) {
      for(let i = 0; i < words.length; i++) {
        let word = words[i];
        let delay = props.delay + props.duration / words.length * i;
        word.style.transform = 'translateY(30px)';
        word.style.opacity = 0;
        animate({
          easing: 'ease',
          el: word,
          translateY: 0,
          opacity: 1,
          duration: props.duration * 1000,
          delay: delay * 1000
        });
      }
      this.setState({
        animationShown: true
      });
    }
  },
  render() {
    return <span className="word-animator">{this.text}</span>;
  }
});

export default WordAnimation;
