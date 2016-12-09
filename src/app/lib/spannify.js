import React from 'react';

export default (words, className, baseStyle) => {
  return words && words.split(' ').map((word, index, array) => {
    const isLastWord = index === array.length-1;
    return <span key={`word-${index}`} className={className} style={baseStyle}>{isLastWord ? word : `${word} `}</span>;
  }) || [];
};
