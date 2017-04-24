'use strict';

import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import map from 'lodash/collection/map';
import last from 'lodash/array/last';
import kebabCase from 'lodash/string/kebabCase';

import Track from 'app/adaptors/server/track';
import SVG from 'app/components/svg';
import StudioContact from 'app/components/studio-contact';
import Subscription from 'app/components/subscription';
import EventsSubscription from 'app/components/events-subscription';

const Footer = React.createClass({
  getInitialState() {
    return {
      selectedStudio: null
    }
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
      return (
        <StudioContact
          key={`studio-${kebabCase(studio.name)}`}
          studio={studio}
          open={this.state.selectedStudio === studio.id}
          onClick={this.generateOnClickStudioHandler(studio)}
        />
      );
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
  renderSubscription() {
    const currentPage = this.props.currentPage;
    switch(currentPage) {
      case 'events':
        return <EventsSubscription />;
        break;
      case 'events/event':
        return <EventsSubscription />;
        break;
      default:
        return <div />;
    }
  },
  renderSocialMediaChannel(url, channel) {
    return (
      <li key={channel} className={classnames('channel', channel)}>
        <a
          href={url}
          onClick={this.onClickSocial(channel)}
          target="_blank"
        >
          <SVG
            className="logo"
            title={`${channel} logo`}
            spritemapID={channel}
          />
        </a>
      </li>
    );
  },
  render() {
    const classes = classnames('footer', `footer-${this.props.currentPage}`);

    return (
      <footer className={classes}>
        {this.renderSubscription()}
        <div className="content">
          <ul className="studios">
            {this.renderStudios()}
          </ul>
          <div className="small-print">
            <div className="copyright">
              <span dangerouslySetInnerHTML={{ __html: get(this.props, 'data.copyright') }} />
              <span dangerouslySetInnerHTML={{ __html: get(this.props, 'data.legal') }} />
              <span dangerouslySetInnerHTML={{ __html: get(this.props, 'data.cookie') }} />
            </div>
            <ul className="social">
              {map(get(this.props, 'data.social', {}), this.renderSocialMediaChannel)}
            </ul>
          </div>
        </div>
      </footer>
    );
  }
});

export default Footer;
