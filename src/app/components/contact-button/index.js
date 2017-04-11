import React from 'react';
import SVG from 'app/components/svg';

function ContactButton() {
  return (
    <button className="contact-button">
      <div className="contact-button-wrapper">
        <div className="contact-button-text">Get in touch</div> <SVG spritemapID="plane" />
      </div>
    </button>
  );
}

export default ContactButton;
