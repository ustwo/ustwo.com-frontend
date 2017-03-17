import React from 'react';
import GradientWords from '../gradient-words';

function HomeMoreMessage({ showPopup }) {
  return (
    <h1>
      <span>We invest in </span><GradientWords
        word="startups"
        color="cold"
      /><span>, build our own </span><GradientWords
        word="products"
        color="lukewarm"
      /><span> and launch new </span><GradientWords
        word="ventures"
        color="hot"
      />
    </h1>
  );
}

export default HomeMoreMessage;
