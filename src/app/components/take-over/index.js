import React from 'react';
import classnames from 'classnames';
import he from 'he';
import TransitionManager from 'react-transition-manager';
import { get } from 'lodash';
import reduce from 'lodash/collection/reduce';

import Track from 'app/adaptors/server/track';
import Flux from 'app/flux';
import getFeaturedImage from 'app/lib/get-featured-image';
import ModalContentMixin from 'app/lib/modal-content-mixin';

import CloseButton from 'app/components/close-button';
import NewsFlash from 'app/components/news-flash';
import Rimage from 'app/components/rimage';

const TakeOver = React.createClass({
  mixins: [ModalContentMixin],
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
    const { takeover } = this.props;
    Track('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'takeover',   // Required.
      'eventAction': 'click_takeover_x',  // Required.
      'eventLabel': takeover.name // Name of the takeover as set in WordPress
    });
    Flux.closeTakeover();
  },
  onClickLink(index) {
    const { takeover } = this.props;
    return (e) => {
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'takeover',   // Required.
        'eventAction': 'click_link_' + index+1,  // Required.
        'eventLabel': get(takeover, 'name') // Name of the takeover as set in WordPress
      });
    }
  },
  renderLink(link, index) {
    const { takeover } = this.props;
    return <li className={`link-item http`}>
      <a
        key={`link${index}`}
        target="_blank"
        href={link.url}
        onClick={this.onClickLink(index)}
        style={{color: get(takeover, 'colours.takeover_header_colour'), borderColor: get(takeover, 'colours.takeover_header_colour')}}
      >
        {link.text}
      </a>
    </li>;
  },
  render() {
    let content;
    const { takeover } = this.props;
    const image = getFeaturedImage(takeover);
    const backgroundColorTop = this.state.showContent ? get(takeover, "colours.background_colour_1") : "#F8F8F8";
    const backgroundColorBottom = this.state.showContent ? get(takeover, "colours.background_colour_2") : "#F8F8F8";
    const styles = {
      color: get(takeover, 'colours.text_color'),
      background: `linear-gradient(to bottom, ${backgroundColorTop} 0%,${backgroundColorBottom} 100%)`
    };
    if (this.state.showContent) {
      content = <div key="detail" className="content">
        <div className="message">
          <CloseButton
            onClose={this.onClickClose}
            autoAnim={1000}
            style={{ fill: get(takeover, "colours.takeover_header_colour") }}
          />
          <Rimage
            wrap="div"
            sizes={get(image, 'media_details.sizes')}
            altText={get(image, 'alt_text')}
          />
        <h1 className="title" style={{color: get(takeover, "colours.takeover_header_colour")}}>
            {he.decode(get(takeover, "name"))}
          </h1>
          <p className="description" style={{color: get(takeover, "colours.text_colour")}}>{get(takeover, "content")}</p>
          <ul className="links">
            {reduce(get(takeover, 'links', {}), (links, value, key) => {
              const index = key[5];
              const type = key.substr(7);
              if(!links[index]) {
                links[index] = {};
              }
              links[index][type] = value;
              return links;
            }, []).map(this.renderLink)}
          </ul>
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
      onClick={this.onClickContent}
      style={styles}
    >
      {content}
    </TransitionManager>;
  }
});

export default TakeOver;
