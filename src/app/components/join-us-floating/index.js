import React from 'react';
import JoinUsButton from 'app/components/join-us-button';

function JoinUsFloating({ buttonFlavour, darkStyle }) {
  const classes = `join-us-floating ${darkStyle ? 'darkStyle' : null}`;

  return (
    <div className={classes}>
      <div className="join-us-floating-inner">
        <p>Are you keen on making a meaningful impact? Interested in joining the ustwo team?</p>
        <JoinUsButton flavour={buttonFlavour ? buttonFlavour : 'join'} />
      </div>
    </div>
  );
}

export default JoinUsFloating;
