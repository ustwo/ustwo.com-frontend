import React from 'react';
import SVG from 'app/components/svg';

function ContactButton() {
  return (
    <a href="mailto:hello@ustwo.com" className="contact-button">
      <div className="contact-button-wrapper">
        <div className="contact-button-text">Get in touch</div> <SVG spritemapID="plane" />
      </div>
    </a>
  );
}

export default ContactButton;
