import React from 'react';
import SVG from 'app/components/svg';
import Video from 'app/components/video';

const rainbowColours = ['#ED0082', '#E60C29', '#FF5519', '#FFBF02', '#96CC29', '#14C04D', '#16D6D9', '#009CF3', '#143FCC', '#6114CC', '#111111'];

function HomeIntro({ scrollProgress, mousePosition }) {
  /* TODO: reverse the axis to change apparent persepective */
  const logoLayers = rainbowColours.map((colour, i) => {
    let modifier = 2 * ((rainbowColours.length - i) * (rainbowColours.length - i) * 0.1);

    /* Reverse signs for mousePosition */
    let coordinateX, coordinateY
    if (mousePosition.coordinateX > 0) {
      coordinateX = Math.abs(mousePosition.coordinateX) * -1;
    } else {
      coordinateX = Math.abs(mousePosition.coordinateX);
    }
    if (mousePosition.coordinateY > 0) {
      coordinateY = Math.abs(mousePosition.coordinateY) * -1;
    } else {
      coordinateY = Math.abs(mousePosition.coordinateY);
    }

    let styles = {
      transform: `translate3d(${coordinateX * modifier}px, ${coordinateY * modifier}px, 0)`,
      fill: colour
    }
    return (<SVG title="ustwo logo layer" spritemapID="ustwologo" style={styles} />);
  });

  return (
    <div className="home-intro">
      <Video
        src="/images/temp/home-intro-video.mp4"
        sizes={tempSizes}
        isVideoBackground={true}
      />
      <div className="home-intro-logo">
        {logoLayers}
      </div>
    </div>
  );
}

module.exports = HomeIntro;

const tempSizes = {
  "thumbnail": {
    "file": "header_image_v2-300x300.png",
    "width": 300,
    "height": 300,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-300x300.png"
  },
  "small": {
    "file": "header_image_v2-576x480.png",
    "width": 576,
    "height": 480,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-576x480.png",
    "name": "small"
  },
  "small_crop": {
    "file": "header_image_v2-640x480.png",
    "width": 640,
    "height": 480,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-640x480.png"
  }
};
