import React from 'react';

function ContentWrapper({ children, className }) {
  return (
    <div className={`content-wrapper ${className}`}>
      <div className="content-wrapper-inner">
        {children}
      </div>
    </div>
  );
}

export default ContentWrapper;
