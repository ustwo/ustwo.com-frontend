import React, { Component } from 'react';
import blendColours from 'app/lib/blend-colours';
import { kebabCase } from 'lodash';

const underlineOffset = 3;
const underlineWidth = 2;

class TextUnderline extends Component {

  constructor(props) {
    super(props);

    let color1, color2;
    if (props.color === 'cold') {
      color1 = "#009CF3";
      color2 = "#16D6D9";
    }
    if (props.color === 'lukewarm') {
      color1 = "#16D6D9";
      color2 = "#96CC29";
    }
    if (props.color === 'hot') {
      color1 = "#FFBF02";
      color2 = "#ED0082";
    }

    this.state = {
      width: 0,
      height: 0,
      color1: color1,
      color2: color2
    }
  }

  defaultState() {
    const { width, height, color1, color2 } = this.state;

    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    for(let x = underlineOffset; x < width - underlineOffset + 1; x++) {
      let y = height - 5;
      let progress = x / width;
      ctx.beginPath(x, y);
      ctx.moveTo(x, y);
      ctx.lineTo(x + 1, y);
      ctx.strokeStyle = '#' + blendColours(color1, color2, progress);
      ctx.lineWidth = underlineWidth;
      ctx.stroke();
    }
  }


  updateCanvas() {
    const { width, height, color1, color2 } = this.state;

    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    for(let x = underlineOffset; x < width - underlineOffset + 1; x++) {
      let y = 2 * Math.sin(x / 20) + (height - 5);
      let progress = x / width;
      ctx.beginPath(x, y);
      ctx.moveTo(x, y);
      ctx.lineTo(x + 1, y);
      ctx.strokeStyle = '#' + blendColours(color1, color2, progress);
      ctx.lineWidth = underlineWidth;
      ctx.stroke();
    }
  }

  onMouseEnter() {
    return () => {
      this.updateCanvas();
    }
  }

  onMouseLeave() {
    return () => {
      this.defaultState();
    }
  }

  componentDidMount() {
    const rect = this.wrapper.getBoundingClientRect();
    this.setState({
      width: rect.width,
      height: rect.height
    });
    this.defaultState();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.defaultState();
    }
  }

  render() {
    const { showPopup, word } = this.props;
    const { color1, color2 } = this.state;
    const style = {
      backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`
    }

    return (
      <span
        className="home-text-block-button"
        onClick={showPopup(kebabCase(word))}
        ref={(ref) => this.wrapper = ref}
        style={style}
      >{word}<canvas
        id="canvas"
        ref={(ref) => this.canvas = ref}
        className="text-underline"
        onMouseEnter={this.onMouseEnter()}
        onMouseLeave={this.onMouseLeave()}
      ></canvas>
      </span>
    );
  }
}

export default TextUnderline;
