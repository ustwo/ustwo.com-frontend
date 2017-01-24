import React from 'react';
import MediaQuery from 'react-responsive';

import Rimage from 'app/components/rimage';

const posterURL = "/images/transparent.png";
const Video = React.createClass({
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
        title="Monument Valley - Behind the Scenes" 
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen>
      </iframe>
    </div>
  },
  renderVideoBackground() {
    return <div className="videoBackground">
      <MediaQuery maxWidth={768}>
        {this.renderImage()}
      </MediaQuery>
      <MediaQuery minWidth={769}>
        {this.renderVideo()}
      </MediaQuery>
    </div>;
  }, 
  renderImage() {
    const { sizes } = this.props;
    return <Rimage sizes={sizes} />;
  },
  renderVideo() {
    const { src } = this.props;
    let video;
    if(src && src.length) {
      video = <video src={src} poster={posterURL} autoPlay loop muted />;
    } else {
      video = this.renderImage();
    }
    return video;
  }

});

export default Video;
