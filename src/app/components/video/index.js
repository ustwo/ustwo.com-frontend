import React, { Component } from 'react';
import classnames from 'classnames';
import Rimage from 'app/components/rimage';
import Flux from 'app/flux';
import env from 'app/adaptors/server/env';

const posterURL = "/images/transparent.png";

class Video extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.video) {
      if (nextProps.play) {
        this.video.play();
      } else {
        this.video.pause();
      }
    }
  }

  // componentWillMount() {
  //   if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
  //     this.setState({
  //       // See if playsInline attribute is valid (i.e. anything before iOS10)
  //       // canPlayMobileVideo: 'playsInline' in document.createElement('video')
  //       canPlayMobileVideo: false
  //     });
  //   }
  // }

  componentDidMount() {
    const { heroVideo, isMobile } = this.props;

    if (heroVideo && this.video) {
      if (env.Modernizr.touchevents) {
        Flux.heroVideoReady(true);
      } else {
        if (this.video.readyState !== 4) {
          this.video.addEventListener('canplaythrough', () => Flux.heroVideoReady(true), false);
        } else {
          Flux.heroVideoReady(true);
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.props.heroVideo && this.video) {
      this.video.removeEventListener('canplaythrough', () => Flux.heroVideoReady(false), false);
    }
    Flux.heroVideoReady(false);
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
    const { imageCSS, isMobile, fixedHeight, hide, loaded } = this.props;

    let styles = {};
    if (loaded && imageCSS) {
      styles['backgroundImage'] = `url(${imageCSS})`;
    }
    if (fixedHeight && env.Modernizr.touchevents) {
      styles['height'] = fixedHeight;
    }
    if (hide) {
      styles['opacity'] = 0;
    }

    const classes = classnames('videoBackground', { imageCSS });

    /* This is before video plays - should show the first frame */
    const fallback = isMobile ? <img className="video-mobile-fallback" src={imageCSS} /> : null;

    return (
      <div className={classes} style={styles}>
        {fallback}
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
    const { src, play, preload } = this.props;
    const preloadAttribute = preload ? preload : 'auto';

    let video;
    if(src && src.length) {
      video = (
        <video
          ref={(ref) => this.video = ref}
          src={src}
          poster={posterURL}
          onClick={(e) => e.preventDefault()}
          preload={preloadAttribute}
          playsInline loop muted
        />
      );
    } else {
      video = this.renderImage();
    }

    return video;
  }

  render() {
    const { isVideoBackground } = this.props;

    if(isVideoBackground) {
      return this.renderVideoBackground();
    } else {
      return this.renderVideoEmbed();
    }
  }

};

export default Video;
