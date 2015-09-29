'use strict';

import React from 'react';
import classnames from 'classnames';

const phoneNumbers = {
  'Sydney': '+61 2 8188 3900',
  'London': '+44 (0)20 7613 0433',
  'New York': '+1 212-518-4900',
  'Malmö': '+46 (0)40-330480'
};

export default class StudioContact extends React.Component {
  render() {
    const studio = this.props.studio;
    const style = this.props.open ? {
      backgroundColor: studio.color,
      borderBottomColor: studio.color
    } : {};
    const mapurl = `https://maps.google.com/maps?z=12&t=m&q=loc:${studio.location.lat}+${studio.location.long}`;
    return (
      <li className={classnames('studio', { open: this.props.open })} style={style}>
        <h1 className="studio-title" onClick={this.onClick}>{studio.name}</h1>
        <div className="studio-details">
          <div className="vcard">
            <p className="phone-number">{phoneNumbers[studio.name]}</p>
            <div className="adr">
              <p className="street-address">{studio.address['street-address']}</p>
              <p><span className="locality">{studio.address['locality']}</span> <span className="region">{studio.address['region']}</span> <span className="postal-code">{studio.address['postal-code']}</span></p>
              <p className="country-name">{studio.address['country-name']}</p>
            </div>
            <a className="url map" target="_blank" style={{borderColor: studio.color}} href={mapurl}>Google Maps</a>
          </div>
        </div>
      </li>
    );
  }
  onClick = () => {
    this.props.onClick && this.props.onClick();
  }
};
