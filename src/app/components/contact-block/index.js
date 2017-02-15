import React, { Component } from 'react';
import SVG from 'app/components/svg';

class ContactBlock extends Component {
  render() {
    return (
      <div className="contact-block">
        <div className="home-text-block">
          <div className="home-section-title">Make something awesome</div>
          <h2>Interested in what ustwo can do for you? Get in touch <span className="home-gradient-text-hot-reverse">work@ustwo.com </span><SVG className="plane" spritemapID="plane" /></h2>
        </div>
      </div>
    )
  }
}

export default ContactBlock;
