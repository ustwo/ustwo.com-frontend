import React from 'react';
import classnames from 'classnames';
import he from 'he';
import TransitionManager from 'react-transition-manager';
import get from 'lodash/object/get';

import Track from '../../adaptors/server/track';
import Flux from '../../flux';
import getFeaturedImage from '../../lib/get-featured-image';

import CloseButton from '../close-button';
import NewsFlash from '../news-flash';
import Rimage from '../rimage';

import {onClickContent} from '../modal';

const takeover = {
  name: "Pause",
  title: "PAUSE &#8211; OUT NOW",
  description: "A totally new relaxation and meditation experience for iPhone.",
  featured_image: 8672,
  header_color: "#2a88a9",
  text_color: "#333",
  background_color_top: "#e3eef4",
  background_color_bottom: "#b3d5e0",
  links: [{
    type: 'http',
    text: 'Download on iOS',
    url: 'http://us2.co/pauseapp'
  }, {
    type: 'http',
    text: 'Go to getpauseapp.com',
    url: 'http://us2.co/pause-web'
  }],
  _embedded: {
    "wp:attachment": [
      {
        "id": 8672,
        "date": "2015-10-05T10:58:17",
        "slug": "pause",
        "type": "attachment",
        "link": "http://ustwo-staging.aws.hmn.md/blog/takeover/pause/pause/",
        "title": {
          "rendered": "pause"
        },
        "author": 3,
        "alt_text": "",
        "media_type": "image",
        "source_url": "https://hmn-uploads.s3.amazonaws.com/ustwo-staging/uploads/2015/10/pause.png",
        "media_details": {
          "width": 670,
          "height": 1028,
          "file": "2015/10/pause.png",
          "sizes": {
            "thumbnail": {
              "file": "pause-300x300.png",
              "width": 300,
              "height": 300,
              "mime-type": "image/png",
              "source_url": "/images/home/pause.png"
            },
            "medium": {
              "file": "pause-501x768.png",
              "width": 501,
              "height": 768,
              "mime-type": "image/png",
              "source_url": "/images/home/pause.png"
            },
            "small": {
              "file": "pause-313x480.png",
              "width": 313,
              "height": 480,
              "mime-type": "image/png",
              "source_url": "/images/home/pause.png"
            },
            "small_crop": {
              "file": "pause-640x480.png",
              "width": 640,
              "height": 480,
              "mime-type": "image/png",
              "source_url": "/images/home/pause.png"
            },
            "medium_crop": {
              "file": "pause-670x768.png",
              "width": 670,
              "height": 768,
              "mime-type": "image/png",
              "source_url": "/images/home/pause.png"
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

const TakeOver = React.createClass({
  getInitialState() {
    return {
      showContent: false
    }
  },
  componentDidMount() {
    this.contentTimeout = setTimeout(() => {
      this.setState({
        showContent: true
      });
    }, 3000);
  },
  componentWillUnmount() {
    clearTimeout(this.contentTimeout);
  },
  onClickClose() {
    // const takeover = this.props.takeover;
    Track('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'takeover',   // Required.
      'eventAction': 'click_takeover_x',  // Required.
      'eventLabel': takeover.name // Name of the takeover as set in WordPress
    });
    Flux.closeTakeover();
  },
  onClickLink(index) {
    // const takeover = this.props.takeover;
    return (e) => {
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'takeover',   // Required.
        'eventAction': 'click_link_' + index+1,  // Required.
        'eventLabel': takeover.name // Name of the takeover as set in WordPress
      });
    }
  },
  renderLink(link, index) {
    let prefix = '';
    switch(link.type) {
      case 'email':
        prefix = 'mailto:';
      break;
      case 'tel':
        prefix = 'tel:';
      break;
    }
    return <li className={`link-item ${link.type}`}>
      <a
        target="_blank"
        href={`${prefix}${link.url}`}
        onClick={this.onClickLink(index)}
        style={{color: takeover.header_color, borderColor: takeover.header_color}}
      >
        {link.text}
      </a>
    </li>;
  },
  render() {
    let content;
    const image = getFeaturedImage(takeover);
    const backgroundColorTop = this.state.showContent ? takeover.background_color_top : "#F8F8F8";
    const backgroundColorBottom = this.state.showContent ? takeover.background_color_bottom : "#F8F8F8";
    const styles = {
      color: takeover.text_color,
      background: `linear-gradient(to bottom, ${backgroundColorTop} 0%,${backgroundColorBottom} 100%)`
    };
    // const takeover = this.props.takeover;
    if (this.state.showContent) {
      content = <div key="detail" className="content">
        <div className="message">
          <CloseButton
            onClose={this.onClickClose}
            autoAnim={1000}
            style={{ fill: takeover.header_color }}
          />
          <Rimage
            wrap="div"
            sizes={get(image, 'media_details.sizes')}
            altText={get(image, 'alt_text')}
          />
          <h1 className="title" style={{color: takeover.header_color}}>
            {he.decode(takeover.title)}
          </h1>
          <p className="description">{takeover.description}</p>
          <ul className="links">{takeover.links.map(this.renderLink)}</ul>
        </div>
      </div>;
    } else {
      content = <div key="news-flash" className="news-flash-wrapper">
        <NewsFlash autoAnim={50} loop={true} />
        <h1 className="title">News</h1>
      </div>;
    }
    return <TransitionManager
      className={`take-over ${this.props.className}`}
      component="div"
      duration={800}
      onClick={onClickContent}
      style={styles}
    >
      {content}
    </TransitionManager>;
  }
});

export default TakeOver;
