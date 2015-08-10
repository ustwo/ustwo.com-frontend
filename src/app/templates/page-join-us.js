'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';

import DownChevron from 'elements/down-chevron';



export default class PageJoinUs extends React.Component {
  render() {
    // const pageData = this.props.page;
    const pageData = {
      "page_builder": [{
        "attr": {
          "heading": {
            "value": "Do the best work of your life"
          }
        }
      }]
    };

    return (
      <article className="page-join-us">

        <section className="hero" style={{backgroundImage: "url('/images/whatwedo/header/image_1.jpg')"}}>
          <h1 className="hero__title">{get(pageData, 'page_builder.0.attr.heading.value')}</h1>
          <img className="hero__image" src="/images/whatwedo/header/image_1.jpg" />
          <DownChevron customClass="hero__down-chevron" ref="downChevron" onClick={this.onClickDownChevron} />
        </section>



      </article>
    );
  }
  componentDidMount() {
    setTimeout(() => {
      this.refs.downChevron.resetAnim();
      this.refs.downChevron.anim();
    }, 500);
  }
  onClickDownChevron() {
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'hub_page',
      'eventAction': 'click_animated_chevron',
      'eventLabel': 'what-we-do'
    });
  }
}
