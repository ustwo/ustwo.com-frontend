import FullImage from './';

const sizes = {
  "thumbnail": {
    "file": "announcing_moodnotes_image-300x300.png",
    "width": 300,
    "height": 300,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/announcing_moodnotes_image-300x300.png"
  },
  "medium": {
    "file": "announcing_moodnotes_image-1024x569.png",
    "width": 1024,
    "height": 569,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/announcing_moodnotes_image-1024x569.png",
    "name": "medium"
  },
  "large": {
    "file": "announcing_moodnotes_image-1800x1000.png",
    "width": 1800,
    "height": 1000,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/announcing_moodnotes_image-1800x1000.png",
    "name": "large"
  },
  "small": {
    "file": "announcing_moodnotes_image-640x356.png",
    "width": 640,
    "height": 356,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/announcing_moodnotes_image-640x356.png",
    "name": "small"
  },
  "small_crop": {
    "file": "announcing_moodnotes_image-640x480.png",
    "width": 640,
    "height": 480,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/announcing_moodnotes_image-640x480.png",
    "name": "small_crop"
  },
  "medium_crop": {
    "file": "announcing_moodnotes_image-1024x768.png",
    "width": 1024,
    "height": 768,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/announcing_moodnotes_image-1024x768.png",
    "name": "medium_crop"
  },
  "large_crop": {
    "file": "announcing_moodnotes_image-1800x1000.png",
    "width": 1800,
    "height": 1000,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/08/announcing_moodnotes_image-1800x1000.png",
    "name": "large_crop"
  }
}

const Sandbox = React.createClass({
  render() {
    return (<FullImage sizes={sizes} />);
  }
});

export default Sandbox;
