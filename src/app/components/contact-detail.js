import React from 'react';

import Flux from '../flux/';
import Track from '../../server/adaptors/track';

export default class ContactDetail extends React.Component {
  render() {
    const detail = this.props.detail;
    return (
      <section className="contact-detail">
        <h1 className="contact-detail__title">{detail.title}</h1>
        <p className="contact-detail__description">{detail.desc}</p>
        {detail.methods.map(link => <a className={`contact-detail__link ${link.type}`} href={`${link.uri}`} onClick={this.onClickContact(detail.type, link)}>{link.text}</a>)}
      </section>
    );
  }
  onClickContact(contactType, link) {
    const isLink = link.type === 'link';
    return (e) => {
      const target = e.currentTarget;
      if(isLink) {
        e.preventDefault();
        Flux.navigate(target.href);
      }
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'contact',   // Required.
        'eventAction': 'click_' + contactType + '_' + link.type,   // Required.
        'eventLabel': 'home', // TODO: Remove once GA has been hooked into router
      });
    };
  }
}
