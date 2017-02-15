'use strict';

import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import kebabCase from 'lodash/string/kebabCase';

import StudioClock from 'app/components/studio-clock';

const phoneNumbers = {
  'Sydney': '+61 2 8188 3900',
  'London': '+44 (0)20 7613 0433',
  'New York': '+1 212-518-4900',
  'Malmö': '+46 (0)40-330480'
};

const StudioContact = React.createClass({
  getInitialState: function() {
    var date = moment();
    return { date: date };
  },
  componentDidMount: function() {
    this.startClock();
  },
  startClock: function() {
    var self = this;
    window.setInterval(function () {
      self.setState({ date: moment() });
    }.bind(this), 60000);
  },
  onClick() {
    this.props.onClick && this.props.onClick();
  },
  studioIsOpen(studio) {
    var currentDate = this.state.date.utcOffset(studio.timezone.offset);
    var currentTime = moment(currentDate.format('HH:mmA'), 'HH:mmA');
    var openingTime = moment(studio.opening_time, 'HH:mmA');
    var closingTime = moment(studio.closing_time, 'HH:mmA');

    if(moment(currentDate).isoWeekday() === 6 || moment(currentDate).isoWeekday() === 7) return false;
    if(moment(currentTime).isBetween(openingTime, closingTime)) return true;

    return false;
  },
  render() {
    const { studio, open } = this.props;
    const style = open ? {
      backgroundColor: studio.color,
      borderBottomColor: studio.color
    } : {};
    const studioClassName = kebabCase(studio.name);
    const mapurl = `https://maps.google.com/maps?z=12&t=m&q=loc:${studio.location.lat}+${studio.location.long}`;
    var showMoon = true;
    if(this.studioIsOpen(studio)) {
      showMoon = false;
    }
    let colour;
    if (studio.name === 'London') {
      colour = `linear-gradient(to right, #009CF3, #16D6D9)`;
    }
    if (studio.name === 'Malmö') {
      colour = `linear-gradient(to right, #FFBF02, #FF5519)`;
    }
    if (studio.name === 'New York') {
      colour = `linear-gradient(to right, #E60C29, #ED0082)`;
    }
    if (studio.name === 'Sydney') {
      colour = `linear-gradient(to right, #16D6D9, #96CC29)`;
    }
    let underlineStyles = {
      backgroundImage: colour
    }
    return <li className={classnames('studio', studioClassName, { open: open })} style={style}>
      <StudioClock date={this.state.date} offset={studio.timezone.offset} colour={colour} showMoon={showMoon} />
      <h4 className="studio-title" onClick={this.onClick}>{studio.name}</h4>
      <div className="studio-details">
        <div className="vcard">
          <p className="phone-number">{studio.address.telephone}</p>
          <div className="adr">
            <p className="street-address">
              {studio.address['street-address']}
            </p>
            <p><span className="locality">{studio.address['locality']}</span> <span className="region">{studio.address['region']}</span> <span className="postal-code">{studio.address['postal-code']}</span></p>
            <p className="country-name">{studio.address['country-name']}</p>
          </div>
          <a
            className="url map"
            target="_blank"
            style={{ borderColor: studio.color }}
            href={mapurl}
          >
            Google Maps
            <div className="contact-underline-style" style={underlineStyles}></div>
          </a>
        </div>
      </div>
    </li>;
  }
});

export default StudioContact;
