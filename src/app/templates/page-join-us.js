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

          <div className="video"></div>

          <div className="slides">

            <div className="slide">
              <div className="card feature">
                <h2>A Place that makes you smile</h2>
                <p>Croque monsieur bocconcini say cheese. When the cheese comes out everybodys happy ricotta smelly cheese.</p>
              </div>
              <div className="card image" style={{backgroundImage: "url('/images/photo.jpg')"}}></div>
            </div>
            <div className="slide">
              <div className="card feature">
                <h2>Personal training budget</h2>
                <p>Croque monsieur bocconcini say cheese. When the cheese comes out everybodys happy ricotta smelly cheese.</p>
              </div>
              <div className="card image" style={{backgroundImage: "url('/images/photo.jpg')"}}></div>
            </div>
            <div className="slide">
              <div className="card feature">
                <h2>Private medical care</h2>
                <p>Croque monsieur bocconcini say cheese. When the cheese comes out everybodys happy ricotta smelly cheese.</p>
              </div>
              <div className="card image" style={{backgroundImage: "url('/images/photo.jpg')"}}></div>
            </div>
            <div className="slide">
              <div className="card feature">
                <h2>Wellness</h2>
                <p>Croque monsieur bocconcini say cheese. When the cheese comes out everybodys happy ricotta smelly cheese.</p>
              </div>
              <div className="card image" style={{backgroundImage: "url('/images/photo.jpg')"}}></div>
            </div>
            <div className="slide">
              <div className="card feature">
                <h2>Life assurance</h2>
                <p>Croque monsieur bocconcini say cheese. When the cheese comes out everybodys happy ricotta smelly cheese.</p>
              </div>
              <div className="card image" style={{backgroundImage: "url('/images/photo.jpg')"}}></div>
            </div>
            <div className="slide">
              <div className="card feature">
                <h2>Flexible Bonuses</h2>
                <p>Croque monsieur bocconcini say cheese. When the cheese comes out everybodys happy ricotta smelly cheese.</p>
              </div>
              <div className="card image" style={{backgroundImage: "url('/images/photo.jpg')"}}></div>
            </div>

          </div>

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
