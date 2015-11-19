import React from 'react';
import classnames from 'classnames';

import Flux from 'app/flux/';
import Track from 'app/adaptors/server/track';

const ContactDetail = React.createClass({
  render() {
    const { detail } = this.props;
    return <div className="contact-detail">
      <h3 className="title">{detail.title}</h3>
      <p className="description">{detail.desc}</p>
      {detail.methods.map(link => {
        return <a
          key={`contact-detail-link-${link.uri}`}
          className={classnames('link', link.type)}
          href={link.uri}
          onClick={this.onClickContact(detail.type, link)}
        >
          {link.text}
        </a>;
      })}
    </div>;
  },
  onClickContact(contactType, link) {
    const isLink = link.type === 'link';
    return (e) => {
      const target = e.currentTarget;
      if (isLink) {
        Flux.override(target.href);
      }
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'contact',   // Required.
        'eventAction': 'click_' + contactType + '_' + link.type,   // Required.
        'eventLabel': 'home', // TODO: Remove once GA has been hooked into router
      });
    };
  }
});

export default ContactDetail;
