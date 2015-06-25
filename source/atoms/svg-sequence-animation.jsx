'use strict';

import React from 'react';

export default class SVGSequenceAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fps: 25,
      currentFrame: 1,
      totalFrames: 0,
      fadeInDuration: 0
    };
  }
  static defaultProps = {
    frameName: "Frame"
  }
  hideAllFrames = () => {
    let svg = React.findDOMNode(this.refs.animsvg);
    for (let index = 0; index < svg.children.length; index++) {
      svg.children[index].style.display = 'none';
    }
  }
  resetAnim = () => {
    this.hideAllFrames();
    this.setState({currentFrame: 1});
  }
  anim = () => {
    setTimeout(() => {
      this.hideAllFrames();
      let currentFrameElement = React.findDOMNode(this.refs.animsvg).getElementById(this.props.frameName+this.state.currentFrame);
      currentFrameElement.style.display = 'inline-block';
      // TODO: add tween function support
      if(this.state.fadeInDuration > 0) currentFrameElement.style.opacity = this.state.currentFrame / this.state.fadeInDuration;
      this.setState({currentFrame: this.state.currentFrame + 1});
      if (this.state.currentFrame <= this.state.totalFrames) {
        window.requestAnimationFrame(this.anim);
      }
    }, 1000/this.state.fps);
  }
  componentDidMount() {
    this.setState({totalFrames: React.findDOMNode(this.refs.animsvg).children.length});
    this.resetAnim();
  }
  render() {
    return null;
  }
};
