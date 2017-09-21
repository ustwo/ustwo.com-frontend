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
      <div>Download the PDF</div>
    );
  } else {
    renderButton = (
      <button
        onClick={onSubmit}
        type="submit"
        className="signup-button"
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

        {renderButton}

      </form>

    </div>
  );
}

export default Signup;
