import React from 'react';
import SVG from 'app/components/svg';
import Flux from 'app/flux';

function onClickContactButton() {
  return (e) => {
    e.preventDefault();
    Flux.navigate('/contact-us');
  }
}

function ContactButton({ flavour }) {
  return (
    <a
      href="/contact-us"
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
