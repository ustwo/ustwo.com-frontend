import React, { Component } from 'react';
import classnames from 'classnames';
import Rimage from 'app/components/rimage';
import Flux from 'app/flux';
import env from 'app/adaptors/server/env';
import Hls from 'hls.js';
import log from 'app/lib/log';

const posterURL = "/images/transparent.png";

// from https://github.com/iambumblehead/canplayhls
const hlsMediaTypes = [
  // Apple santioned
  'application/vnd.apple.mpegurl',
  // Apple sanctioned for backwards compatibility
  'audio/mpegurl',
  // Very common
  'audio/x-mpegurl',
  // Very common
  'application/x-mpegurl',
  // Included for completeness
  'video/x-mpegurl',
  'video/mpegurl',
  'application/mpegurl'
];

function canPlayHlsNatively(videoElement) {
  return videoElement && videoElement.canPlayType && hlsMediaTypes.some(function (mediaType) {
    return /maybe|probably/i.test(videoElement.canPlayType(mediaType));
  });
}

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

    if (this.video && !this.video.src) {
      if (srcHls && srcHls.length && canPlayHlsNatively(this.video)) {
        this.video.setAttribute('src', srcHls);
      } else if (srcHls && srcHls.length && Hls.isSupported() && this.hlsInstance === null) {
        this.hlsInstance = new Hls({abrEwmaDefaultEstimate: 5000000, startLevel: 3});
        this.hlsInstance.attachMedia(this.video);
        this.hlsInstance.on(Hls.Events.MEDIA_ATTACHED, () => {
          const hlsFragments = [];
          this.hlsInstance.loadSource(srcHls);
          this.hlsInstance.on(Hls.Events.FRAG_LOADED, function (event, data) {
            hlsFragments.push(data.frag);
          });
          this.hlsInstance.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
            const fragmentLevels = hlsFragments.map(fragment => fragment.level);
            const maxLevel = fragmentLevels.reduce((max, cur) => Math.max(max, cur), 0);
            hlsFragments.map((fragment, index) => {
              if (fragment.level < maxLevel) {
                this.hlsInstance.trigger(Hls.Events.BUFFER_FLUSHING, {startOffset: fragment.startPTS, endOffset: fragment.endPTS});
                hlsFragments.splice(index, 1);
              }
            });
          });
        });
      } else if (this.hlsInstance === null) {
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
