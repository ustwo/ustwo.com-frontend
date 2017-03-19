import React, { Component } from 'react';
import classnames from 'classnames';
import Rimage from 'app/components/rimage';
import Flux from 'app/flux';

const posterURL = "/images/transparent.png";

class Video extends Component {

  constructor(props) {
    super(props);

    this.state = {
      canPlayVideo: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.video && nextProps.play != undefined) {
      if (nextProps.play) {
        this.video.play();
      } else {
        this.video.pause();
      }
    }
  }

  componentDidMount() {
    if (this.props.isVideoBackground && this.props.play != undefined) {
      this.video.addEventListener("canplaythrough", () => {
        Flux.backgroundVideoReady(true);
      }, false);
    }
  }

  componentWillUnmount() {
    Flux.backgroundVideoReady(false);
  }

  render() {
    const { isVideoBackground } = this.props;

    if(isVideoBackground) {
      return this.renderVideoBackground();
    } else {
      return this.renderVideoEmbed();
    }
  }

  renderVideoEmbed() {
    const { videoId, videoFrom } = this.props;
    let src;
    switch(videoFrom) {
      case 'vimeo':
        src = "https://player.vimeo.com/video/" + videoId;
        break;
      case 'youtube':
          src = "https://www.youtube.com/embed/" + videoId;
          break;
      default:
        src = "https://player.vimeo.com/video/" + videoId;
    }
    return (
      <div className="video">
        <iframe
          src={src}
          width="1280"
          height="720"
          frameborder="0"
          title="Video"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen>
        </iframe>
      </div>
    );
  }

  renderVideoBackground() {
    const { imageCSS } = this.props;

    let styles;
    if (imageCSS) {
      styles = { backgroundImage: `url(${imageCSS})` }
    }
    let classes = classnames('videoBackground', { imageCSS });

    return (
      <div className={classes} style={styles}>
        {this.renderVideo()}
      </div>
    );
  }

  renderImage() {
    if (!this.props.imageCSS) {
      const { sizes } = this.props;
      return (<Rimage sizes={sizes} />)
    }
  }

  renderVideo() {
    const { src, play } = this.props;

    let video;
    if(src && src.length) {
      if (play === undefined) {
        video = (<video src={src} poster={posterURL} autoPlay loop muted />);
      } else {
        video = (<video ref={(ref) => this.video = ref} src={src} poster={posterURL} playsInline loop muted />);
      }
    } else {
      video = this.renderImage();
    }

    return video;
  }

};

export default Video;
