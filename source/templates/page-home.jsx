'use strict';

import React from 'react';
import Imager from 'imager.jsx';

import DownChevron from '../atoms/down-chevron.jsx';

import BoldHeader from '../components/bold-header.jsx';
import HomeTextBlock from '../components/home-text-block.jsx';
import ScreenBlock from '../components/screen-block.jsx';

export default class PageHome extends React.Component {
  animateChevron = (event) => {
    this.refs.downChevron.resetAnim();
    this.refs.downChevron.anim();
  }
  componentDidMount() {
    this.animateChevron();
  }
  render() {
    const HeadlineBackground = Imager({});
    const HarveyNicksDevice = Imager({});
    const MonumentDevice = Imager({});
    return (
      <article className="page__home">
        <ScreenBlock customClass="page__home-block-welcome" colour="rain">
          <HeadlineBackground className="page__home-headline-background" src="images/home/Homepage-Hero.png"/>
          <BoldHeader colour="white">We're a digital<br/>product studio</BoldHeader>
          <DownChevron ref="downChevron" onClick={this.animateChevron}/>
        </ScreenBlock>
        <ScreenBlock customClass="page__home-block-client-work" hexColour="#6A86EC">
          <HarveyNicksDevice className="page__home-harvey-nicks-device" src="images/home/Homepage-Harvey-Phone.png"/>
          <HomeTextBlock title="Innovative client work">
            <p>Investing into passion projects has something something something something something something something something something 2 Baftas, a few D&AD pencils and other heavy metal things.</p>
          </HomeTextBlock>
        </ScreenBlock>
        <ScreenBlock customClass="page__home-block-own-ip" hexColour="#3F63D9">
          <HomeTextBlock title="Award winning own IP">
            <p>Investing into passion projects has something something something something something something something something something 2 Baftas, a few D&AD pencils and other heavy metal things.</p>
          </HomeTextBlock>
          <MonumentDevice className="page__home-monument-device" src="images/home/Homepage-Games-Ipad.png"/>
        </ScreenBlock>
        <ScreenBlock customClass="page__home-block-ventures" colour="navy">
          <img src="https://placekitten.com/g/200/300"/>
          <HomeTextBlock title="Launching new ventures">
            <p>Investing into passion projects has something something something something something something something something something 2 Baftas, a few D&AD pencils and other heavy metal things.</p>
          </HomeTextBlock>
        </ScreenBlock>
        <ScreenBlock customClass="page__home-block-studio" colour="honey">
          <img src="https://placekitten.com/g/200/300"/>
        </ScreenBlock>
      </article>
    );
  }
};
