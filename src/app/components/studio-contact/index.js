'use strict';

import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

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
    this.start();
  },
  start: function() {
    var self = this;
    (function tick() {
      self.setState({ date: moment() });
      requestAnimationFrame(tick);
    }());
  },
  onClick() {
    this.props.onClick && this.props.onClick();
  },
  render() {
    const { studio, open } = this.props;
    const style = open ? {
      backgroundColor: studio.color,
      borderBottomColor: studio.color
    } : {};
    const mapurl = `https://maps.google.com/maps?z=12&t=m&q=loc:${studio.location.lat}+${studio.location.long}`;
    return <li className={classnames('studio', { open: open })} style={style}>
      <StudioClock date={this.state.date} offset={studio.timezone.offset} colour={studio.color} />
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
          </a>
        </div>
      </div>
    </li>;
  }
});

export default StudioContact;
