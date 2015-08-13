'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';

import WorkItem from '../components/work-item';
import DownChevron from '../elements/down-chevron';

export default class PageWork extends React.Component {
  render() {
    const pageData = this.props.page;
    return (
      <article className="page-work">
        <section className="hero" style={{backgroundImage: "url('/images/whatwedo/header/image_1.jpg')"}}>
          <h1 className="hero__title">{get(pageData, 'page_builder.0.attr.heading.value')}</h1>
          <img className="hero__image" src="/images/whatwedo/header/image_1.jpg" />
          <DownChevron customClass="hero__down-chevron" ref="downChevron" onClick={this.onClickDownChevron} />
        </section>
        <section className="page-work__intro">
          <h2 className="page-work__intro__title">{get(pageData, 'page_builder.1.attr.heading.value')}</h2>
          <hr className="page-work__intro__rule" />
          <div className="page-work__intro__para" dangerouslySetInnerHTML={{__html: get(pageData, 'page_builder.1.attr.body.value')}} />
        </section>
        <ul className="page-work__list">
          {get(pageData, 'page_builder.2.attr.case_studies.value', '').split(',').map(caseStudyName => {
            const caseStudyData = find(get(pageData, '_embedded.ustwo:case_studies', []), 'slug', caseStudyName);
            const attachments = (pageData && pageData._embedded && pageData._embedded['http://v2.wp-api.org/attachment']) || [];
            return <WorkItem key={caseStudyName} className="page-work__list__item" data={caseStudyData} attachments={attachments} />;
          })}
        </ul>
      </article>
    );
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.refs.downChevron.resetAnim();
    //   this.refs.downChevron.anim();
    // }, 500);
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
