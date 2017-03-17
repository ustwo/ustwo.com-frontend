import React from 'react';
import GradientWords from '../gradient-words';

function ContactBlock() {
  return (
    <div className="contact-block">
      <div className="home-text-block">
        <div className="section-title">Make something awesome</div>
        <h2>Get in touch <br /><span className="contact-block-email"><GradientWords word="work@ustwo.com" color="hot" reverse={true} /></span></h2>
      </div>
    </div>
  )
}

export default ContactBlock;
