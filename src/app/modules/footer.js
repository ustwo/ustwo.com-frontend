'use strict';

import React from 'react';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';

import Track from '../../server/adaptors/track';
import Flux from '../flux';
import SVG from '../elements/svg';
import StudioContact from '../components/studio-contact';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStudio: null
    }
  }
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
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'contact',   // Required.
        'eventAction': 'click_social_' + social,     // Required.
        'eventLabel': 'home' // TODO: Remove once GA has been hooked into router
      });
    };
  }
  render() {
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
                <a href={get(this.props, 'data.social.facebook')} onClick={this.onClickSocial('facebook')} target="_blank">
                  <SVG className="logo" title="facebook logo" spritemapID='facebook' />
                </a>
              </li>
              <li className="channel twitter">
                <a href={get(this.props, 'data.social.twitter')} onClick={this.onClickSocial('twitter')} target="_blank">
                  <SVG className="logo" title="twitter logo" spritemapID='twitter' />
                </a>
              </li>
              <li className="channel linkedin">
                <a href={get(this.props, 'data.social.linkedin')} onClick={this.onClickSocial('linkedin')} target="_blank">
                  <SVG className="logo" title="linkedin logo" spritemapID='linkedin' />
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
              <li>We're using <a href="https://www.iubenda.com/privacy-policy/322454/cookie-policy" target="_blank">cookies</a> and here's our <a href="https://www.iubenda.com/privacy-policy/322454" target="_blank">Privacy Policy</a>.</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  renderStudios = () => {
    const studios = this.props.studios;
    return studios && studios.map(studio => {
      return <StudioContact
        key={`studio-${kebabCase(studio.name.toLowerCase())}`}
        studio={studio}
        open={this.state.selectedStudio === studio.id}
        onClick={this.generateOnClickStudioHandler(studio)}
      />;
    });
  }
  generateOnClickStudioHandler = (studio) => {
    return () => {
      this.setState({
        selectedStudio: this.state.selectedStudio === studio.id ? null : studio.id
      });
    }
  }
}
