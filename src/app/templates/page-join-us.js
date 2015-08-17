'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import map from 'lodash/collection/map';
import get from 'lodash/object/get';
import DownChevron from '../elements/down-chevron';
import Slide from '../components/slide';
import StudioJobs from '../components/studio-jobs';

const studios = {
  all: "All studios",
  london: "London",
  malmo: "Malmö",
  newyork: "New York",
  sydney: "Sydney"
}

export default class PageJoinUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studio: Object.keys(studios)[0]
    }
  }
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
            {this.renderStudioTabs()}
          </nav>
          <div className="jobs-container">
            {this.renderStudioJobs()}
          </div>
        </section>

      </article>
    );
  }
  renderStudioTabs = () => {
    return map(studios, (name, id) => {
      return <li ref={`tab-${id}`} onClick={this.generateOnClickStudioHandler(id)} aria-selected={this.state.studio === id}>{name}</li>;
    });
  }
  generateOnClickStudioHandler = (studio) => {
    return () => {
      const el = React.findDOMNode(this.refs[`tab-${studio}`]);
      const tabs = Object.keys(studios).map(studio => {
        return React.findDOMNode(this.refs[`tab-${studio}`]);
      });
      tabs.forEach(tab => tab.setAttribute('aria-selected', false));
      el.setAttribute('aria-selected', true);
      this.setState({
        studio: studio
      });
    }
  }
  renderStudioJobs = () => {
    return map(studios, (name, id) => {
      return <StudioJobs studio={id} selected={this.state.studio === id} />;
    });
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
      'eventLabel': 'join-us'
    });
  }
}
