import React from 'react';

function ContactFloating({ title, type }) {
  return (
    <div className="contact-floating">
      <div className="contact-floating-inner">
        <h2>{title}</h2>
        <p>Lorem ipsum</p>
        <p>{`${type}@ustwo.com`}</p>
      </div>
    </div>
  );
}

export default ContactFloating;
