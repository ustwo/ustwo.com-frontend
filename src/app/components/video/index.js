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

    this.state = {
      noObjectFit: !env.Modernizr.objectfit
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.video && !navigator.userAgent.match(/(Twitter)/i)) {
      if (nextProps.play === true) {
        if (this.video.paused) {
          this.video.play();
        }
      } else if (nextProps.play === false) {
        if (!this.video.paused) {
          this.video.pause();
        }
      }
    }
  }

  componentDidMount() {
    if (this.video && !this.video.src) {
      this.setVideoSource();
    }
  }

  setVideoSource() {
    const { src, srcHls, heroVideo, isMobile } = this.props;

    if (srcHls && srcHls.length && canPlayHlsNatively(this.video)) {
      this.video.setAttribute('src', srcHls);
    } else if (srcHls && srcHls.length && Hls.isSupported() && this.hlsInstance === null) {
      this.hlsInstance = new Hls({abrEwmaDefaultEstimate: 5000000, startLevel: 3});
      this.hlsInstance.attachMedia(this.video);
      this.hlsInstance.on(Hls.Events.MEDIA_ATTACHED, () => {
        const hlsFragments = [];
        this.hlsInstance.loadSource(srcHls);
        this.hlsInstance.on(Hls.Events.FRAG_LOADED, function (event, data) {
          log(`Video fragment quality level: ${data.frag.level}`, data.frag);
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

  renderImage() {
    if (!this.props.imageCSS) {
      const { sizes } = this.props;
      return (<Rimage sizes={sizes} />)
    }
  }

  renderVideo() {
    const { preload } = this.props;
    const { noObjectFit } = this.state;

    return (
      <video
        ref={(ref) => this.video = ref}
        poster={posterURL}
        className={classnames({ noObjectFit })}
        onClick={(e) => e.preventDefault()}
        preload={preload ? preload : 'auto'}
        playsInline loop muted autoPlay
      />
    );
  }

  render() {
    const { src, srcHls, imageCSS, fixedHeight, loaded } = this.props;
    const { noObjectFit } = this.state;

    let styles = {};
    if (loaded && imageCSS) {
      styles['backgroundImage'] = `url(${imageCSS})`;
    }
    if (fixedHeight && env.Modernizr.touchevents) {
      styles['height'] = `${fixedHeight}px`;
    }

    const classes = classnames('videoBackground', { imageCSS });

    return (
      <div className={classes} style={styles}>
        <img className={`video-mobile-fallback ${classnames({ noObjectFit })}`} src={imageCSS} />
        {(src && src.length) || (srcHls && srcHls.length) ? this.renderVideo() : this.renderImage()}
      </div>
    );
  }
};

export default Video;
