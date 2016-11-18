'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

function SVGSequenceAnimation(props) {
  return {
    getInitialState() {
      return Object.assign({
        currentFrame: 0,
        fadeInDuration: 0,
        fps: 25,
        frameName: 'Frame',
        totalFrames: 0
      }, props);
    },
    componentDidMount() {
      const autoAnim = this.props.autoAnim;
      let svgElement = ReactDOM.findDOMNode(this.refs.animsvg);
      this.setState({totalFrames: svgElement.childNodes.length});
      if(autoAnim) {
        if(autoAnim) {
          setTimeout(this.anim, autoAnim);
        } else {
          this.anim();
        }
      } else if(this.state.fadeInDuration > 0) {
        for(let i = 1; i <= this.state.fadeInDuration; i++) {
          // TODO: add tween function support
          svgElement.getElementById(this.state.frameName + i).style.opacity = i / this.state.fadeInDuration;
        }
      }
      this.resetAnim();
    },
    componentWillUnmount() {
      this.resetAnim();
    },
    hideAllFrames() {
      let svg = ReactDOM.findDOMNode(this.refs.animsvg);
      for (let i = 0; i < svg.childNodes.length; i++) {
        svg.childNodes[i].style.display = 'none';
      }
    },
    goToFrame(frameNumber) {
      this.setState({currentFrame: frameNumber});
      window.cancelAnimationFrame(this.frameRequest);
      this.frameRequest = window.requestAnimationFrame(() => {
        this.hideAllFrames();
        ReactDOM.findDOMNode(this.refs.animsvg).getElementById(this.state.frameName+frameNumber).style.display = 'inline-block';
      });
    },
    goToProgressRatio(progressRatio) {
      this.goToFrame(Math.ceil(this.state.totalFrames * progressRatio));
    },
    resetAnim() {
      clearTimeout(this.timeout);
      window.cancelAnimationFrame(this.frameRequest);
      this.hideAllFrames();
      this.setState({currentFrame: 0});
    },
    anim() {
      this.timeout = setTimeout(() => {
          this.goToFrame(this.state.currentFrame + 1);
          if (this.state.currentFrame < this.state.totalFrames) {
            this.anim();
          } else {
            if(this.props.loop) {
              this.setState({ currentFrame: 0 });
              this.anim();
            }
          }
      }, 1000 / this.state.fps);
    }
  }
};

export default SVGSequenceAnimation;
