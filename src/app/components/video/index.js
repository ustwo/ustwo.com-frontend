import React from 'react';

const Video = React.createClass({
  render() {
    const videoURL = "https://player.vimeo.com/external/143640008.hd.mp4?s=7c2a73ce981cae52bedc594546b6d27e17ca4f7b&profile_id=113";
    const posterURL = "/images/transparent.png";

    return <div className="video">
      <video src={videoURL} poster={posterURL} autoPlay loop />
    </div>;
  }
});

export default Video;
