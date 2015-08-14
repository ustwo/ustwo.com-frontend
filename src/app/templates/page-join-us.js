'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import DownChevron from '../elements/down-chevron';
import Slide from '../components/slide';
import StudioJobs from '../components/studio-jobs';

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

        <section className="why-ustwo">

          <div className="video"></div>

          <div className="slides">
            <Slide />
            <Slide />
            <Slide />
            <Slide />
            <Slide />
            <Slide />
          </div>

        </section>

        <div className="hero-image" style={{backgroundImage: "url(/images/photo.jpg)"}}>
          <svg className="ustwo-logo" title="ustwo logo" role="img" dangerouslySetInnerHTML={{__html: svgContent }} />
          <h2>Current Openings</h2>
        </div>

        <section className="jobs">
          <nav className="jobs-studio-tabs">
            <label htmlFor="tab-all">All studios</label>
            <label htmlFor="tab-london">London</label>
            <label htmlFor="tab-malmo">Malmö</label>
            <label htmlFor="tab-newyork">New York</label>
            <label htmlFor="tab-sydney">Sydney</label>
          </nav>
          <StudioJobs studio="all" />
          <StudioJobs studio="london" />
          <StudioJobs studio="malmo" />
          <StudioJobs studio="newyork" />
          <StudioJobs studio="sydney" />
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
