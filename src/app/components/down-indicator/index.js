import React from 'react';

function DownIndicator({ onClick }) {
  return (
    <div className="down-indicator" onClick={onClick}>
      <div className="down-indicator-icon">,</div>
    </div>
  );
};

export default DownIndicator;
