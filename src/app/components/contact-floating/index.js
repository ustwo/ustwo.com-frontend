import React from 'react';
import ContactButton from 'app/components/contact-button';

function ContactFloating({ title, type, darkStyle, buttonFlavour }) {
  const classes = `contact-floating ${darkStyle ? 'darkStyle' : null}`;

  return (
    <div className={classes}>
      <div className="contact-floating-inner">
        <p>Have a project or an idea you'd like to collaborate with ustwo on? Interested in what ustwo can do for you?</p>
        <ContactButton flavour={buttonFlavour ? buttonFlavour : 'home'} />
      </div>
    </div>
  );
}

export default ContactFloating;
