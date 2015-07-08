'use strict';

import React from 'react';
import Imager from 'imager.jsx';

import DownChevron from '../elements/down-chevron.jsx';
import WordAnimation from '../elements/word-animation.jsx';
import BoldHeader from '../components/bold-header.jsx';
import HomeTextBlock from '../components/home-text-block.jsx';
import ScreenBlock from '../components/screen-block.jsx';
import EntranceAnimation from '../elements/entrance-animation.jsx';

export default class PageHome extends React.Component {
  animateChevron = (event) => {
    this.refs.downChevron.resetAnim();
    this.refs.downChevron.anim();
  }
  componentDidMount() {
    this.animTimeout = setTimeout(() => {
      this.animateChevron();
    }, 2140);
  }
  componentWillUnmount() {
    clearTimeout(this.animTimeout);
  }
  render() {
    const HeadlineBackground = Imager({});
    const HarveyNicksDevice = Imager({});
    const HarveyNicksShape1 = '<use xlink:href="images/spritemap.svg#HarveyShape1" />';
    const HarveyNicksShape2 = '<use xlink:href="images/spritemap.svg#HarveyShape2" />';
    const HarveyNicksShape3 = '<use xlink:href="images/spritemap.svg#HarveyShape3" />';
    const HarveyNicksShape4 = '<use xlink:href="http://localhost:3000/images/spritemap.svg#HarveyShape4" />';
    const MonumentDevice = Imager({});
    const headlineBackgroundAnimationOptions = {
      ease: Power2.easeOut,
      opacity: 0
    };
    const headlineWordsAnimationOptions = {
      ease: Power2.easeOut,
      opacity: 0,
      y: 30
    };
    return (
      <article className="page-home">
        <ScreenBlock customClass="page-home__screen-block--welcome" colour="rain">
          <EntranceAnimation delay={2.05} duration={1} options={headlineBackgroundAnimationOptions}>
            <HeadlineBackground className="page-home__headline-background" src="images/home/Homepage-Hero.png"/>
          </EntranceAnimation>
          <BoldHeader colour="white">
            <WordAnimation delay={1.3} duration={0.75} options={headlineWordsAnimationOptions}>
              We're a digital<br/>product studio
            </WordAnimation>
          </BoldHeader>
          <DownChevron ref="downChevron" onClick={this.animateChevron}/>
        </ScreenBlock>
        <ScreenBlock customClass="page-home__screen-block--client" hexColour="#6A86EC">
          <div className="page-home__image-margin-container">
            <svg className="page-home__harvey-nicks-shape-3 page-home__harvey-nicks-shape" role="presentation" dangerouslySetInnerHTML={{__html: HarveyNicksShape3 }} />
            <svg className="page-home__harvey-nicks-shape-4 page-home__harvey-nicks-shape" role="presentation" dangerouslySetInnerHTML={{__html: HarveyNicksShape4 }} />
            <HarveyNicksDevice className="page-home__harvey-nicks-device" src="images/home/Homepage-Harvey-Phone.png"/>
            <svg className="page-home__harvey-nicks-shape-1 page-home__harvey-nicks-shape" role="presentation" dangerouslySetInnerHTML={{__html: HarveyNicksShape1 }} />
            <svg className="page-home__harvey-nicks-shape-2 page-home__harvey-nicks-shape" role="presentation" dangerouslySetInnerHTML={{__html: HarveyNicksShape2 }} />
          </div>
          <div className="page-home__text-block-vertical-centerer">
            <HomeTextBlock title="Innovative client work">
              <p>Client work projects has something something something something something something something something something 2 Baftas, a few D&AD pencils and other heavy metal things.</p>
            </HomeTextBlock>
          </div>
        </ScreenBlock>
        <ScreenBlock customClass="page-home__screen-block--own-ip" hexColour="#3F63D9">
          <MonumentDevice className="page-home__monument-device" src="images/home/Homepage-Games-Ipad.png"/>
          <div className="page-home__text-block-vertical-centerer">
            <HomeTextBlock title="Award winning own IP">
              <p>Investing into passion projects has something something something something something something something something something 2 Baftas, a few D&AD pencils and other heavy metal things.</p>
            </HomeTextBlock>
          </div>
        </ScreenBlock>
        <ScreenBlock customClass="page-home__screen-block--ventures" colour="navy">
          <img src="https://placekitten.com/g/200/350"/>
          <div className="page-home__text-block-vertical-centerer">
            <HomeTextBlock title="Launching new ventures">
              <p>Launching ventures has something something something something something something something something something something something something something something something 2 Baftas, a few D&AD pencils and other heavy metal things.</p>
            </HomeTextBlock>
          </div>
        </ScreenBlock>
        <ScreenBlock customClass="page-home__screen-block--studio" colour="honey">
          <img src="https://placekitten.com/g/200/300"/>
        </ScreenBlock>
      </article>
    );
  }
};
