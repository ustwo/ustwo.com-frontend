import React from 'react';
import MediaQuery from 'react-responsive';

import Rimage from '../rimage';

const Video = React.createClass({
  render() {
    const { src, sizes } = this.props;
    const posterURL = "/images/transparent.png";
    return <div className="video">
      <MediaQuery maxWidth={768}>
        <Rimage sizes={sizes} />
      </MediaQuery>
      <MediaQuery minWidth={769}>
        <video src={src} poster={posterURL} autoPlay loop />
      </MediaQuery>
    </div>;
  }
});

export default Video;
