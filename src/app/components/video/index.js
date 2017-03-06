import React from 'react';
import classnames from 'classnames';
import Rimage from 'app/components/rimage';

const posterURL = "/images/transparent.png";

const Video = React.createClass({

  componentWillReceiveProps(nextProps) {
    if (nextProps.play != undefined && !this.props.isMobile) {
      if (nextProps.play) {
        this.refs.video.play();
      } else {
        this.refs.video.pause();
      }
    }
  },

  render() {
    const { isVideoBackground } = this.props;

    if(isVideoBackground) {
      return this.renderVideoBackground();
    } else {
      return this.renderVideoEmbed();
    }
  },

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
    return <div className="video">
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
  },

  renderTint() {
    if (this.props.tint) {
      return (<div className="videoBackground-tint"></div>);
    }
  },

  renderVideoBackground() {
    let styles;
    if (this.props.imageCSS) {
      styles = {
        backgroundImage: `url(${this.props.imageCSS})`
      }
    }

    let content;
    if (this.props.isMobile) {
      content = this.renderImage();
    } else {
      content = (
        <div>
          {this.renderVideo()}
          {this.renderTint()}
        </div>
      );
    }

    let classes = classnames('videoBackground', {
      imageCSS: this.props.imageCSS
    });

    return (
      <div className={classes} style={styles}>
        {content}
      </div>
    );
  },

  renderImage() {
    if (!this.props.imageCSS) {
      const { sizes } = this.props;
      return (<Rimage sizes={sizes} />)
    }
  },

  renderVideo() {
    const { src, play } = this.props;

    let video;
    if(src && src.length) {
      if (play === undefined) {
        video = <video src={src} poster={posterURL} autoPlay loop muted />;
      } else {
        video = <video ref="video" src={src} poster={posterURL} loop muted />;
      }
    } else {
      video = this.renderImage();
    }

    return video;
  }

});

export default Video;
