import Rimage from './';

const sizes = {
  "thumbnail": {
    "file": "header_image_v2-30x30.png",
    "width": 30,
    "height": 30,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-30x30.png"
  },
  "small": {
    "file": "header_image_v2-300x300.png",
    "width": 300,
    "height": 300,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-300x300.png"
  },
  "medium": {
    "file": "header_image_v2-576x480.png",
    "width": 576,
    "height": 480,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-576x480.png",
    "name": "small"
  },
  "large": {
    "file": "header_image_v2-640x480.png",
    "width": 640,
    "height": 480,
    "mime-type": "image/png",
    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2011/06/header_image_v2-640x480.png"
  }
};

const Sandbox = React.createClass({
  render() {
    return (<div className="sandbox">
      <style>{`
        img,
        a {
          display: block;
          width: 100%;
        }
        .sandbox div img {
          display: none;
        }
      `}</style>
      <Rimage
        sizes={sizes}
      />
      <Rimage
        sizes={sizes}
        href="/test"
      />
      <Rimage
        sizes={sizes}
        wrap="div"
      />
      <Rimage
        sizes={sizes}
        className="test-class"
      />
      <Rimage
        sizes={sizes}
        backgroundOnly={true}
      />
      <Rimage
        sizes={sizes}
      >Some children</Rimage>
    </div>);
  }
});

export default Sandbox;
