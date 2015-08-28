'use strict';

import React from 'react';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';

import Track from '../../server/adaptors/track';
import Flux from '../flux';
import StudioContact from '../components/studio-contact';

export default class Footer extends React.Component {
  onClickShowContacts(e) {
    e.preventDefault();
    Track('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'contact',   // Required.
      'eventAction': 'click_contact_footer',     // Required.
      'eventLabel': 'home' // TODO: Remove once GA has been hooked into router
    });
    Flux.showContacts();
  }
  onClickSocial(social) {
    return (e) => {
      const target = e.currentTarget;
      e.preventDefault();
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'contact',   // Required.
        'eventAction': 'click_social_' + social,     // Required.
        'eventLabel': 'home', // TODO: Remove once GA has been hooked into router
        'hitCallback' : () => {
          window.location = target.href;
        }
      });
    };
  }
  render() {
    const facebookLogo = '<use xlink:href="/images/spritemap.svg#facebook" />';
    const twitterLogo = '<use xlink:href="/images/spritemap.svg#twitter" />';
    const linkedinLogo = '<use xlink:href="/images/spritemap.svg#linkedin" />';

    return (
      <footer className="footer">
        <div className="feedback">
          <span className="beta-tag">BETA</span> Got feedback? <a href="https://ustwo.typeform.com/to/ecVjrZ" target="_blank">Let us know</a>
        </div>
        <div className="content">
          <div className="general">
            <h1 className="contact-title">{get(this.props, 'data.title')}</h1>
            <hr className="contact-divider" />
            <a className="email-cta" href="mailto:hello@ustwo.com" onClick={this.onClickShowContacts}>{get(this.props, 'data.contact_link_text')}</a>
            <ul className="social">
              <li className="channel facebook">
                <a href={get(this.props, 'data.social.facebook')} onClick={this.onClickSocial('facebook')}>
                  <svg className="logo" title="facebook logo" role="img" dangerouslySetInnerHTML={{__html: facebookLogo }} />
                </a>
              </li>
              <li className="channel twitter">
                <a href={get(this.props, 'data.social.twitter')} onClick={this.onClickSocial('twitter')}>
                  <svg className="logo" title="twitter logo" role="img" dangerouslySetInnerHTML={{__html: twitterLogo }} />
                </a>
              </li>
              <li className="channel linkedin">
                <a href={get(this.props, 'data.social.linkedin')} onClick={this.onClickSocial('linkedin')}>
                  <svg className="logo" title="linkedin logo" role="img" dangerouslySetInnerHTML={{__html: linkedinLogo }} />
                </a>
              </li>
            </ul>
          </div>
          <ul className="studios">
            {this.renderStudios()}
          </ul>
          <div className="copyright">
            <ul>
              <li>Copyright &copy; ustwo studio Ltd. All rights reserved.</li>
              <li>For company information and other legal bits, see our <a href="/legal">legal page</a></li>
              <li>We are using <a href="/privacy">cookies</a>, hope you're cool with that.</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  renderStudios = () => {
    const studios = this.props.studios;
    return studios && studios.map(studio => {
      return <StudioContact key={`studio-${kebabCase(studio.name.toLowerCase())}`} studio={studio} />;
    });
  }
}
