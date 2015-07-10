'use strict';

import React from 'react';

export default class SVGSequenceAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrame: 0,
      fadeInDuration: 0,
      fps: 25,
      frameName: 'Frame',
      totalFrames: 0
    };
  }
  hideAllFrames = () => {
    let svg = React.findDOMNode(this.refs.animsvg);
    for (let i = 0; i < svg.childNodes.length; i++) {
      svg.childNodes[i].style.display = 'none';
    }
  }
  goToFrame = (frameNumber) => {
    this.hideAllFrames();
    React.findDOMNode(this.refs.animsvg).getElementById(this.state.frameName+frameNumber).style.display = 'inline-block';
    this.setState({currentFrame: frameNumber});
  }
  goToProgressRatio = (progressRatio) => {
    this.goToFrame(Math.ceil(this.state.totalFrames * progressRatio));
  }
  resetAnim = () => {
    this.hideAllFrames();
    this.setState({currentFrame: 0});
    // TODO: remove setTimeout() / requestAnimationFrame()
  }
  anim = () => {
    setTimeout(() => {
      this.goToFrame(this.state.currentFrame+1);
      if (this.state.currentFrame < this.state.totalFrames) {
        window.requestAnimationFrame(this.anim);
      }
    }, 1000/this.state.fps);
  }
  componentDidMount() {
    let svgElement = React.findDOMNode(this.refs.animsvg);
    this.setState({totalFrames: svgElement.childNodes.length});
    if(this.state.fadeInDuration > 0) {
      for(let i = 1; i <= this.state.fadeInDuration; i++) {
        // TODO: add tween function support
        svgElement.getElementById(this.state.frameName+i).style.opacity = i / this.state.fadeInDuration;
      }
    }
    this.resetAnim();
  }
  render() {
    return null;
  }
};
