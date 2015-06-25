'use strict';

import React from 'react';

import BoldHeader from '../components/bold-header.jsx';
import HomeTextBlock from '../components/home-text-block.jsx';
import ScreenBlock from '../components/screen-block.jsx';

export default class PageHome extends React.Component {
  render() {
    return (
      <article className="page__home">
        <ScreenBlock colour="rain">
          <BoldHeader colour="white">We're a digital product studio</BoldHeader>
        </ScreenBlock>
        <ScreenBlock hexColour="#6A86EC">
          <p><img src="https://placekitten.com/g/200/300"/></p>
          <HomeTextBlock title="Innovative client work">
            <p>Investing into passion projects has something something something something something something something something something 2 Baftas, a few D&AD pencils and other heavy metal things.</p>
          </HomeTextBlock>
        </ScreenBlock>
        <ScreenBlock hexColour="#3F63D9">
          <HomeTextBlock title="Award winning own IP">
            <p>Investing into passion projects has something something something something something something something something something 2 Baftas, a few D&AD pencils and other heavy metal things.</p>
          </HomeTextBlock>
          <p><img src="https://placekitten.com/g/200/300"/></p>
        </ScreenBlock>
        <ScreenBlock colour="blu">
          <p><img src="https://placekitten.com/g/200/300"/></p>
          <HomeTextBlock title="Launching new ventures">
            <p>Investing into passion projects has something something something something something something something something something 2 Baftas, a few D&AD pencils and other heavy metal things.</p>
          </HomeTextBlock>
        </ScreenBlock>
      </article>
    );
  }
};
