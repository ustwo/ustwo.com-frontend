import React from 'react';
import Spinner from 'app/components/loading-icon';

function buttonContent(status) {
  if (status === 'sending') {
    return 'Sending...';
  }
  return 'Submit';
}

function Signup({ payload, onNameInput, onCompanyInput, onEmailInput, onSubmit, status, errorMessage }) {
  const classes = `signup signup-status-${status}`;

  let renderContact;
  if (status === 'success') {
    renderContact = (
      <div className="signup-form-wrapper">

        <div className="signup-form-wrapper-text">
          <p>Now it's all yours – download a PDF copy below. </p>
          <p>And remember, we’d love to hear any feedback you have, contact us here: mobility@ustwo.com.</p>
        </div>

        <a href="https://usweb-cdn.ustwo.com/ustwo-production/uploads/2017/10/Humanising-Autonomy-Where-Are-We-Going-ustwo-Auto-v1.1.pdf" target="_blank" className="signup-download-button">
          <div className="signup-download-button-text">Download</div>
          <div className="signup-download-button-additional">19.3Mb</div>
        </a>

        <img src="/images/thankyou.png" alt="Thank you" />

      </div>
    );
  } else {
    renderContact = (
      <div className="signup-form-wrapper">

        <p>We're giving away this book to encourage open conversation and debate – it's intended to be a conversation starter, not the final word. Fill in this form to download your free copy:</p>

        <form className="signup-form">

          <input
            value={payload.name}
            onChange={onNameInput}
            type="text"
            id="inputName"
            placeholder="Name"
            className="signup-input"
          />

          <input
            value={payload.company}
            onChange={onCompanyInput}
            type="text"
            id="inputCompany"
            placeholder="Company"
            className="signup-input"
          />

          <input
            value={payload.email}
            onChange={onEmailInput}
            type="text"
            id="inputEmail"
            placeholder="you@email.com"
            className="signup-input"
          />

          <div className="signup-buttons">
            <button
              onClick={onSubmit}
              type="submit"
              className="signup-submit-button"
            >
              {buttonContent(status)}
            </button>
            <div className="signup-error-message">
              { status === 'error' ? `Oops! ${errorMessage}` : '' }
            </div>
          </div>

        </form>

      </div>
    );
  }

  return (
    <div className={classes}>
      {renderContact}
    </div>
  );
}

export default Signup;
