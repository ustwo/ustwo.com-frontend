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
      let svgElement = React.findDOMNode(this.refs.svgFrames);
      this.setState({ totalFrames: svgElement.childNodes.length });
    },
    hideAllFrames() {
      let svg = React.findDOMNode(this.refs.svgFrames);
      for (let i = 0; i < svg.childNodes.length; i++) {
        svg.childNodes[i].style.display = 'none';
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
        React.findDOMNode(this.refs.svgFrames).getElementById('Frame' + currentFrame).style.display = 'inline-block';
      });
    }
  }
}

export default SVGSequenceScroll;
