import React from 'react';
import SVG from 'app/components/svg';
import Flux from 'app/flux';

function onClickContactButton() {
  return (e) => {
    e.preventDefault();
    Flux.navigate('contact');
  }
}

function ContactButton({ flavour }) {
  return (
    <a
      href="/contact"
      onClick={onClickContactButton()}
      className={`contact-button flavour-${flavour}`}
    >
      <div className="contact-button-wrapper">
        <div className="contact-button-text">Get in touch</div>
        <SVG spritemapID="plane" />
      </div>
    </a>
  );
}

export default ContactButton;
