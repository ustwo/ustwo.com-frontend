import Takeover from './';

const takeover = {
  "id": 9031,
  "name": "Test",
  "content": "This is still a test",
  "link": "https://wp-staging.ustwo.com/blog/takeover/test/",
  "slug": "test",
  "featured_image": 9017,
  "colours": {
    "takeover_header_colour": "#ff9999",
    "background_colour_1": "#aa9999",
    "background_colour_2": "#dd9999",
    "text_colour": "#333"
  },
  "links": {
    "link_1_text": "Link 1 Text",
    "link_1_url": "http://test1.com/",
    "link_2_text": "Link 2 text",
    "link_2_url": "http://test2.com/"
  },
  "_embedded": {
    "wp:attachment": [
      [{
        "id": 9017,
        "date": "2015-10-05T14:18:28",
        "slug": "banner-option-3-sml-300x300",
        "type": "attachment",
        "link": "https://wp-staging.ustwo.com/blog/case-study/jaguar-land-rover/banner-option-3-sml-300x300/",
        "title": {
          "rendered": "banner-option-3-sml-300&#215;300"
        },
        "author": 89,
        "alt_text": "",
        "media_type": "image",
        "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/09/banner-option-3-sml-300x300.png",
        "media_details": {
          "width": 300,
          "height": 300,
          "file": "2015/09/banner-option-3-sml-300x300.png",
          "sizes": {
            "thumbnail": {
              "file": "pause-300x300.png",
              "width": 300,
              "height": 300,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-300x300.png"
            },
            "medium": {
              "file": "pause-584x768.png",
              "width": 584,
              "height": 768,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-584x768.png"
            },
            "small": {
              "file": "pause-365x480.png",
              "width": 365,
              "height": 480,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-365x480.png"
            },
            "small_crop": {
              "file": "pause-640x480.png",
              "width": 640,
              "height": 480,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-640x480.png"
            },
            "medium_crop": {
              "file": "pause-664x768.png",
              "width": 664,
              "height": 768,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-664x768.png"
            }
          },
          "image_meta": {
            "aperture": 0,
            "credit": "",
            "camera": "",
            "caption": "",
            "created_timestamp": 0,
            "copyright": "",
            "focal_length": 0,
            "iso": 0,
            "shutter_speed": 0,
            "title": "",
            "orientation": 0
          }
        }
      }], {
        "id": 9017,
        "date": "2015-10-05T14:18:28",
        "slug": "banner-option-3-sml-300x300",
        "type": "attachment",
        "link": "https://wp-staging.ustwo.com/blog/case-study/jaguar-land-rover/banner-option-3-sml-300x300/",
        "title": {
          "rendered": "banner-option-3-sml-300&#215;300"
        },
        "author": 89,
        "alt_text": "",
        "media_type": "image",
        "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/09/banner-option-3-sml-300x300.png",
        "media_details": {
          "width": 300,
          "height": 300,
          "file": "2015/09/banner-option-3-sml-300x300.png",
          "sizes": {
            "thumbnail": {
              "file": "pause-300x300.png",
              "width": 300,
              "height": 300,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-300x300.png"
            },
            "medium": {
              "file": "pause-584x768.png",
              "width": 584,
              "height": 768,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-584x768.png"
            },
            "small": {
              "file": "pause-365x480.png",
              "width": 365,
              "height": 480,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-365x480.png"
            },
            "small_crop": {
              "file": "pause-640x480.png",
              "width": 640,
              "height": 480,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-640x480.png"
            },
            "medium_crop": {
              "file": "pause-664x768.png",
              "width": 664,
              "height": 768,
              "mime-type": "image/png",
              "source_url": "https://wp-staging.ustwo.com/content/uploads/2015/10/pause-664x768.png"
            }
          },
          "image_meta": {
            "aperture": 0,
            "credit": "",
            "camera": "",
            "caption": "",
            "created_timestamp": 0,
            "copyright": "",
            "focal_length": 0,
            "iso": 0,
            "shutter_speed": 0,
            "title": "",
            "orientation": 0
          }
        }
      }
    ]
  }
};

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <Takeover takeover={takeover} />
    </div>;
  }
});

export default Sandbox;
