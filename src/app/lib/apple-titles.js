import React from 'react';

export default (title) => {
  if (title && title.toLowerCase().includes('imessage')) {
    const index = title.search(/imessage/i);

    return (
      <span>
        {title.slice(0, index)}
        <span className="appleTitle">
          {title.slice(index, index+1)}
        </span>
        {title.slice(index+1)}
      </span>
    )
  }
  return title;
}
