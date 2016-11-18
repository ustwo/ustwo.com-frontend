'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const FramesUstwoLogo = React.createClass({

  getInitialState() {
    return {
      currentFrame: 0,
      totalFrames: 0
    }
  },

  componentDidMount() {
    let frames = ReactDOM.findDOMNode(this.refs.frames);
    this.setState({ totalFrames: frames.childNodes.length });

    this.hideAllFrames();
  },

  componentWillReceiveProps(nextProps) {
    let framePosition = Math.ceil(nextProps.scrollProgress * this.state.totalFrames);

    if (framePosition === 0) {
      framePosition = 1;
    }

    if (nextProps.reverse) {
      this.setState({ currentFrame: this.state.totalFrames - framePosition + 1 });
    } else {
      this.setState({ currentFrame: framePosition });
    }

    let frames = ReactDOM.findDOMNode(this.refs.frames);

    window.cancelAnimationFrame(this.frameRequest);
    this.frameRequest = window.requestAnimationFrame(() => {
      this.hideAllFrames();
      frames.childNodes[this.state.currentFrame - 1].style.display = 'inline-block';
    });
  },

  hideAllFrames() {
    let frames = ReactDOM.findDOMNode(this.refs.frames);
    for (let i = 0; i < frames.childNodes.length; i++) {
      frames.childNodes[i].style.display = 'none';
    }
  },

  render() {

    return (
      <div className="frames-ustwo-logo" style={this.props.style}>
        <div ref="frames" id="frames">
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN01.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN02.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN03.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN04.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN05.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN06.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN07.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN08.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN09.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN10.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN11.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN12.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN13.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN14.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN15.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN16.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN17.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN18.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN19.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN20.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN21.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN22.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN23.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN24.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN25.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN26.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN27.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN28.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN29.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN30.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN31.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN32.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN33.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN34.png" />
          </div>
          <div>
            <img src="/images/temp/ustwo_logo_draw_IN35.png" />
          </div>
        </div>
      </div>
    );
  }
});

export default FramesUstwoLogo;
