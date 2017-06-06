import React, { Component } from 'react';
import classnames from 'classnames';
import Rimage from 'app/components/rimage';
import Flux from 'app/flux';
import env from 'app/adaptors/server/env';
import Hls from 'hls.js';
import log from 'app/lib/log';

const posterURL = "/images/transparent.png";

class Video extends Component {

  constructor(props) {
    super(props);

    this.hlsInstance = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.video && !navigator.userAgent.match(/(Twitter)/i)) {
      if (nextProps.play) {
        if (this.video.paused) {
          this.video.play();
        }
      } else {
        if (!this.video.paused) {
          this.video.pause();
        }
      }
    }
  }

  componentDidMount() {
    const { src, srcHls, heroVideo, isMobile } = this.props;

    if (this.video) {
      if (srcHls && srcHls.length && Hls.isSupported() && this.hlsInstance === null) {
        this.hlsInstance = new Hls();
        this.hlsInstance.attachMedia(this.video);
        this.hlsInstance.on(Hls.Events.MEDIA_ATTACHED, () => {
          log("video and hls.js are now bound together !");
          this.hlsInstance.loadSource(srcHls);
          this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            log("manifest loaded, found " + data.levels.length + " quality level");
          });
        });
      }
      if (this.hlsInstance === null) {
        this.video.setAttribute('src', src);
      }
    }

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
          frameBorder="0"
          title="Video"
          allowFullScreen>
        </iframe>
      </div>
    );
  }

  renderVideoBackground() {
    const { src, srcHls, imageCSS, isMobile, fixedHeight, hide, loaded } = this.props;

    let styles = {};
    if (loaded && imageCSS) {
      styles['backgroundImage'] = `url(${imageCSS})`;
    }
    if (fixedHeight && env.Modernizr.touchevents) {
      styles['height'] = `${fixedHeight}px`;
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
        {(src && src.length) || (srcHls && srcHls.length) ? this.renderVideo() : this.renderImage()}
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
    const { preload } = this.props;

    return (
      <video
        ref={(ref) => this.video = ref}
        poster={posterURL}
        onClick={(e) => e.preventDefault()}
        preload={preload ? preload : 'auto'}
        playsInline loop muted
      />
    );
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
