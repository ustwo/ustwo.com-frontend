import React from 'react';
import MediaQuery from 'react-responsive';

import Rimage from '../rimage';

const posterURL = "/images/transparent.png";
const Video = React.createClass({
  render() {
    return <div className="video">
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
      video = <video src={src} poster={posterURL} autoPlay loop />;
    } else {
      video = this.renderImage();
    }
    return video;
  }
});

export default Video;
