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
    const svgContent = '<use xlink:href="/images/spritemap.svg#ustwologo" />';
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

        <section className="jobs">
          <div className="hero-image" style={{backgroundImage: "url(/images/photo.jpg)"}}>
            <svg className="ustwo-logo" title="ustwo logo" role="img" dangerouslySetInnerHTML={{__html: svgContent }} />
            <h2>Current Openings</h2>
          </div>
          <div className="main">
            <ul className="tabs">
              <li><a href="#">All Studios</a></li>
              <li><a href="#">London</a></li>
              <li><a href="#">Malmö</a></li>
              <li><a href="#">New York</a></li>
              <li><a href="#">Sydney</a></li>
            </ul>
            <div className="tab-container">
              <div className="tab-content tab-all">
                <ul className="job-list">
                  <li>Job1</li>
                  <li>Job2</li>
                  <li>Job3</li>
                  <li>Job4</li>
                  <li>Job5</li>
                  <li>Job6</li>
                  <li>Job7</li>
                </ul>
              </div>
              <div className="tab-content tab-london">
                <h3>London</h3>
                <div className="studio-info">
                  <p className="excerpt">Join our flagship studio in Shoreditch</p>
                  <p className="content">Occuping three floors of The Tea Building in Shoreditch, our UK studio has over 100 talented and driven people. We're dedicatoed to delivering pixel perfect work for clients including Barclays and Cahnnel4, as well as our own products including Whale Trail and Monument Valley.</p>
                </div>
                <ul className="job-list">
                  <li>Job1</li>
                  <li>Job2</li>
                  <li>Job3</li>
                  <li>Job4</li>
                </ul>
              </div>
              <div className="tab-content tab-malmo">
                <h3>Malmö</h3>
                <ul className="job-list">
                  <li>Job1</li>
                  <li>Job2</li>
                </ul>
              </div>
              <div className="tab-content tab-newyork">
                <h3>New York</h3>
                <ul className="job-list">
                  <li>Job1</li>
                  <li>Job2</li>
                  <li>Job3</li>
                </ul>
              </div>
              <div className="tab-content tab-sydney">
                <h3>Sydney</h3>
                <ul className="job-list">

                </ul>
                <div className="no-jobs">
                  <p>We don't have any openings currently. However we're always looking for talented individuals to join the ustwo family.</p>
                  <a href="#">Get in touch</a>
                </div>

              </div>
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
