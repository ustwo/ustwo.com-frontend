'use strict';

import React from 'react';
import classnames from 'classnames';

export default class StudioContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  onClickTitle = () => {
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    const studio = this.props.studio;
    const style = this.state.open ? {
      backgroundColor: studio.color,
      borderBottomColor: studio.color
    } : {};
    const mapurl = `https://maps.google.com/maps?z=12&t=m&q=loc:${studio.location.lat}+${studio.location.long}`;
    return (
      <li className={classnames('studio', { open: this.state.open })} style={style}>
        <h1 className="studio-title" onClick={this.onClickTitle}>{studio.name}</h1>
        <div className="studio-details">
          <div className="vcard">
            <div className="adr">
              <p className="street-address">{studio.address['street-address']}</p>
              <p><span className="locality">{studio.address['locality']}</span> <span className="region">{studio.address['region']}</span> <span className="postal-code">{studio.address['postal-code']}</span></p>
              <p className="country-name">{studio.address['country-name']}</p>
            </div>
            <a className="url map" style={{borderColor: studio.color}} href={mapurl}>Google Maps</a>
          </div>
        </div>
      </li>
    );
  }
};
