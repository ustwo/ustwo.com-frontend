import Video from './';

const sizes = {
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

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox full-width-component">
      <style>{`
        .sandbox {
          height: 100vh;
        }
      `}</style>
      <Video
        src="https://player.vimeo.com/external/143640008.sd.mp4?s=c2766105f03ee623f8b53fc274a33b563d30067d&profile_id=112"
        sizes={sizes}
      />
    </div>;
  }
});

export default Sandbox;
