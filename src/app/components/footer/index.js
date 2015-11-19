'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';

import Track from 'app/adaptors/server/track';
import Flux from 'app/flux';
import SVG from 'app/components/svg';
import StudioContact from 'app/components/studio-contact';
import Subscription from 'app/components/subscription';

const Footer = React.createClass({
  getInitialState() {
    return {
      selectedStudio: null
    }
  },
  onClickShowContacts(e) {
    e.preventDefault();
    Track('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'contact',   // Required.
      'eventAction': 'click_contact_footer',     // Required.
      'eventLabel': 'home' // TODO: Remove once GA has been hooked into router
    });
    Flux.showContacts();
  },
  onClickSocial(social) {
    return (e) => {
      Track('send', {
        'hitType': 'event',          // Required.
        'eventCategory': 'contact',   // Required.
        'eventAction': 'click_social_' + social,     // Required.
        'eventLabel': 'home' // TODO: Remove once GA has been hooked into router
      });
    };
  },
  renderStudios() {
    const studios = this.props.studios;
    return studios && studios.map(studio => {
      return <StudioContact
        key={`studio-${kebabCase(studio.name)}`}
        studio={studio}
        open={this.state.selectedStudio === studio.id}
        onClick={this.generateOnClickStudioHandler(studio)}
      />;
    });
  },
  generateOnClickStudioHandler(studio) {
    const { selectedStudio } = this.state;
    return () => {
      this.setState({
        selectedStudio: selectedStudio === studio.id ? null : studio.id
      });
    }
  },
  renderSocialMediaChannel(channel) {
    return <li key={channel} className={classnames('channel', channel)}>
      <a
        href={get(this.props, `data.social.${channel}`)}
        onClick={this.onClickSocial(channel)}
        target="_blank"
      >
        <SVG
          className="logo"
          title={`${channel} logo`}
          spritemapID={channel}
        />
      </a>
    </li>;
  },
  render() {
    return <footer className="footer">
      <Subscription />
      <div className="content">
        <div className="general">
          <a
            className="email-cta"
            href="mailto:hello@ustwo.com"
            onClick={this.onClickShowContacts}
          >
            {get(this.props, 'data.contact_link_text')}
          </a>
          <ul className="social">
            {['facebook', 'twitter', 'linkedin'].map(this.renderSocialMediaChannel)}
          </ul>
        </div>
        <ul className="studios">
          {this.renderStudios()}
        </ul>
        <div className="copyright">
          <ul>
            <li>Copyright &copy; ustwo studio Ltd. All rights reserved.</li>
            <li>For company information and other legal bits, see our <a href="/legal">legal page</a>.</li>
            <li>We’re using <a href="https://www.iubenda.com/privacy-policy/322454/cookie-policy" target="_blank">cookies</a>, hope that’s cool. Here’s our <a href="https://www.iubenda.com/privacy-policy/322454" target="_blank">Privacy Policy</a>.</li>
          </ul>
        </div>
      </div>
    </footer>;
  }
});

export default Footer;
