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
      }, {
        "attr": {
          "heading": {
            "value": "Get to know ustwo"
          },
          "body": {
            "value": "<p>Cheesy feet paneer who moved my cheese. Fromage frais halloumi queso cheese triangles feta boursin port-salut macaroni cheese. Mozzarella smelly cheese cheese triangles rubber cheese ricotta the big cheese ricotta melted cheese. Chalk and cheese stinking bishop.</p>"
          }
        }
      }]
    };

    return (
      <article className="page-join-us">

        <section className="hero">
          <h1 className="hero__title">{get(pageData, 'page_builder.0.attr.heading.value')}</h1>
          <img className="hero__image" src="/images/home/Homepage_Games_Ipad.png"/>
          <DownChevron customClass="hero__down-chevron" ref="downChevron" onClick={this.onClickDownChevron} />
        </section>

        <section className="intro">
          <h2 className="intro__title">{get(pageData, 'page_builder.1.attr.heading.value')}</h2>
          <hr className="intro__rule" />
          <div className="intro__para" dangerouslySetInnerHTML={{__html: get(pageData, 'page_builder.1.attr.body.value')}} />
        </section>

        <section className="features-grid">

          <div className="slide slide-1">
            <div className="card card-1"></div>
            <div className="card card-2"></div>
          </div>
          <div className="slide slide-2">
            <div className="card card-3"></div>
            <div className="card card-4"></div>
          </div>
          <div className="slide slide-3">
            <div className="card card-5"></div>
            <div className="card card-6"></div>
          </div>
          <div className="slide slide-4">
            <div className="card card-7"></div>
            <div className="card card-8"></div>
          </div>
          <div className="slide slide-5">
            <div className="card card-9"></div>
            <div className="card card-10"></div>
          </div>
          <div className="slide slide-6">
            <div className="card card-11"></div>
            <div className="card card-12"></div>
          </div>

          <div className="video"></div>

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
