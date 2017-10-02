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

  let renderButton;
  if (status === 'success') {
    renderButton = (
      <a href="/" className="signup-download-button">Download the PDF</a>
    );
  } else {
    renderButton = (
      <button
        onClick={onSubmit}
        type="submit"
        className="signup-submit-button"
      >
        {buttonContent(status)}
      </button>
    );
  }

  return (
    <div className={classes}>

      <div className="signup-error-message">
        { status === 'error' ? `Oops! ${errorMessage}` : '' }
      </div>

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
          {renderButton}
        </div>

      </form>

    </div>
  );
}

export default Signup;
