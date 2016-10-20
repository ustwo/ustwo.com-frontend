'use strict';

import React from 'react';

function SVGSequenceScroll(props) {
  return {
    getInitialState() {
      return Object.assign({
        totalFrames: 0
      }, props);
    },
    componentDidMount() {
      this.hideAllFrames();
      let frames = React.findDOMNode(this.refs.frames);
      this.setState({ totalFrames: frames.childNodes.length });
    },
    hideAllFrames() {
      let frames = React.findDOMNode(this.refs.frames);
      for (let i = 0; i < frames.childNodes.length; i++) {
        frames.childNodes[i].style.display = 'none';
      }
    },
    initiateSequence() {
      let framePosition = Math.floor(this.props.scrollProgress * this.state.totalFrames);

      if (framePosition === 0) {
        framePosition = 1;
      }

      let currentFrame;
      if (this.props.reverse) {
        currentFrame = this.state.totalFrames - framePosition + 1;
      } else {
        currentFrame = framePosition;
      }

      window.cancelAnimationFrame(this.frameRequest);
      this.frameRequest = window.requestAnimationFrame(() => {
        this.hideAllFrames();

        let frames = React.findDOMNode(this.refs.frames);
        frames.childNodes[currentFrame - 1].style.display = 'inline-block';
      });
    }
  }
}

export default SVGSequenceScroll;
