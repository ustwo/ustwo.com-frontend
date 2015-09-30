import React from 'react';

export default (words, className) => {
  return words && words.split(' ').map((word, index, array) => {
    const isLastWord = index === array.length-1;
    return <span key={`word-${index}`} className={className}>{isLastWord ? word : `${word} `}</span>;
  }) || [];
};
