import Hero from './';
import renderVariations from '../../lib/sandbox/render-variations';

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
        .hero {
          background-color: #FFBF02;
        }
      `}</style>
      {renderVariations({
        'With down chevron': <Hero
            title="This is a title"
            showDownChevron={true}
            sizes={sizes}
          />,
        'With children': <Hero
            title="This is a title"
            showDownChevron={false}
            sizes={sizes}
          >Some children</Hero>,
        'Without image': <Hero
            title="This is a title"
            showDownChevron={true}
          />
      })}
    </div>;
  }
});

export default Sandbox;
