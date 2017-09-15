import React from 'react';
import Spinner from 'app/components/loading-icon';

function buttonContent(status) {
  if (status === 'sending') {
    return <Spinner />;
  } else if (status === 'success') {
    return 'You\'re in :)';
  }
  return 'Sign me up for beta!';
}

function Signup({ email, onEmailInput, onSubmit, status, errorMessage }) {
  const classes = `signup signup--status-${status}`;

  return (
    <div className={classes}>

      <div className="signup__error-message">
        { status === 'error' ? `Oops! ${errorMessage}` : '' }
      </div>

      <form className="signup__form">

        <input
          value={email}
          onChange={onEmailInput}
          type="text"
          id="input"
          placeholder="you@email.com"
          className="signup__email-input"
        />

        <button
          onClick={onSubmit}
          type="submit"
          className="signup__submit-button"
        >
          {buttonContent(status)}
        </button>

      </form>

    </div>
  );
}

export default Signup;
