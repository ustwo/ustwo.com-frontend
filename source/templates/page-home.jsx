'use strict';

import React from 'react';
import Imager from 'imager.jsx';
import ScrollMagic from '../../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js';
import '../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';

import DownChevron from '../elements/down-chevron.jsx';

import BoldHeader from '../components/bold-header.jsx';
import HomeTextBlock from '../components/home-text-block.jsx';
import ScreenBlock from '../components/screen-block.jsx';

export default class PageHome extends React.Component {
  animateChevron = (event) => {
    this.refs.downChevron.resetAnim();
    this.refs.downChevron.anim();
  }
  setupScrollMagic = () => {
    let blocks = [
      {
        blockReference: React.findDOMNode(this.refs.blockClient),
        hexColour1: '6114CC',
        hexColour2: '6A86EC'
      },
      {
        blockReference: React.findDOMNode(this.refs.blockOwnStuff),
        hexColour1: '6A86EC',
        hexColour2: '3F63D9'
      },
      {
        blockReference: React.findDOMNode(this.refs.blockVenture),
        hexColour1: '3F63D9',
        hexColour2: '143FCC'
      },
      {
        blockReference: React.findDOMNode(this.refs.blockStudio),
        hexColour1: '143FCC',
        hexColour2: 'FFBF02'
      },
    ];

    let scrollController = new ScrollMagic.Controller();

    let blockWelcome = React.findDOMNode(this.refs.blockWelcome);
    let scrollSceneWelcome = new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        duration: () => {return blockWelcome.offsetHeight * 0.7}
      })
      .addTo(scrollController)
      .on('progress', (e) => {
        let progressRatio = e.progress.toFixed(3);
        if (progressRatio > 0) this.refs.downChevron.goToProgressRatio(0.91 - progressRatio * 0.9);
    });

    let pageReference = React.findDOMNode(this.refs.page);
    for (let block of blocks) {
      this.createColourBlockScene(scrollController, pageReference, block.blockReference, block.hexColour1, block.hexColour2);
    }
  }
  createColourBlockScene = (scrollController, pageReference, blockReference, hexColour1, hexColour2) => {
    return new ScrollMagic.Scene({
        triggerElement: blockReference,
        triggerHook: 'onEnter',
        duration: () => {return blockReference.offsetHeight}
      })
      .addTo(scrollController)
      // .addIndicators() // add indicators (requires plugin)
      .on('progress', (e) => {
        pageReference.style.backgroundColor = '#' + this.blendColours(hexColour1, hexColour2, parseFloat(e.progress.toFixed(3)));
    });
  }
  blendColours = (colour1, colour2, percentage) => {
    function intToHex(num) {
      let hex = Math.round(num).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }

    function hexToInt(hexArray) {
      return [parseInt(hexArray[0] + hexArray[1], 16), parseInt(hexArray[2] + hexArray[3], 16), parseInt(hexArray[4] + hexArray[5], 16)];
    }

    let rgbColour1 = hexToInt(colour1);
    let rgbColour2 = hexToInt(colour2);

    let rgbColour3 = [
      (1 - percentage) * rgbColour1[0] + percentage * rgbColour2[0],
      (1 - percentage) * rgbColour1[1] + percentage * rgbColour2[1],
      (1 - percentage) * rgbColour1[2] + percentage * rgbColour2[2]
    ];

    return intToHex(rgbColour3[0]) + intToHex(rgbColour3[1]) + intToHex(rgbColour3[2]);
  }
  componentDidMount() {
    this.animateChevron();
    this.setupScrollMagic();
  }
  render() {
    const HeadlineBackground = Imager({});
    const HarveyNicksDevice = Imager({});
    const HarveyNicksShape1 = '<use xlink:href="images/spritemap.svg#HarveyShape1" />';
    const HarveyNicksShape2 = '<use xlink:href="images/spritemap.svg#HarveyShape2" />';
    const HarveyNicksShape3 = '<use xlink:href="images/spritemap.svg#HarveyShape3" />';
    const HarveyNicksShape4 = '<use xlink:href="images/spritemap.svg#HarveyShape4" />';
    const MonumentDevice = Imager({});
    const DiceDevice = Imager({});
    return (
      <article ref="page" className="page-home">
        <ScreenBlock ref="blockWelcome" customClass="page-home__screen-block--welcome">
          <HeadlineBackground className="page-home__headline-background" src="images/home/Homepage-Hero.png"/>
          <BoldHeader colour="white">We're a digital<br/>product studio</BoldHeader>
          <DownChevron ref="downChevron" onClick={this.animateChevron}/>
        </ScreenBlock>
        <ScreenBlock ref="blockClient" customClass="page-home__screen-block--client">
          <div className="page-home__image-margin-container">
            <svg className="page-home__harvey-nicks-shape-3 page-home__harvey-nicks-shape" role="presentation" dangerouslySetInnerHTML={{__html: HarveyNicksShape3 }} />
            <svg className="page-home__harvey-nicks-shape-4 page-home__harvey-nicks-shape" role="presentation" dangerouslySetInnerHTML={{__html: HarveyNicksShape4 }} />
            <HarveyNicksDevice className="page-home__harvey-nicks-device" src="images/home/Homepage-Harvey-Phone.png"/>
            <svg className="page-home__harvey-nicks-shape-1 page-home__harvey-nicks-shape" role="presentation" dangerouslySetInnerHTML={{__html: HarveyNicksShape1 }} />
            <svg className="page-home__harvey-nicks-shape-2 page-home__harvey-nicks-shape" role="presentation" dangerouslySetInnerHTML={{__html: HarveyNicksShape2 }} />
          </div>
          <div className="page-home__text-block-vertical-centerer">
            <HomeTextBlock title="Innovative client work">
              <p>We work as partners with the world’s best businesses to help them build successful, innovative digital products for a complex and evolving marketplace.</p>
            </HomeTextBlock>
          </div>
        </ScreenBlock>
        <ScreenBlock ref="blockOwnStuff" customClass="page-home__screen-block--own-stuff">
          <MonumentDevice className="page-home__monument-device" src="images/home/Homepage-Games-Ipad.png"/>
          <div className="page-home__text-block-vertical-centerer">
            <HomeTextBlock title="Award-winning own products and games">
              <p>We understand that the best way to learn is by doing. We invest time and money to create our own products, testing ideas and concepts all the way from initial ideas to launch and beyond – learning and improving at every stage. With hugely successful, award-winning games like Monument Valley and innovative, problem-solving products like Wayfindr, we’ve proven that we can deliver. </p>
            </HomeTextBlock>
          </div>
        </ScreenBlock>
        <ScreenBlock ref="blockVenture" customClass="page-home__screen-block--ventures">
          <div className="page-home__image-margin-container">
            <DiceDevice className="page-home__dice-device" src="https://placekitten.com/g/200/300"/>
          </div>
          <div className="page-home__text-block-vertical-centerer">
            <HomeTextBlock title="Launching new ventures">
              <p>Collaboration is key. What excites us is working with people who know their industry inside out to create new and disruptive businesses. If we’re not starting a joint venture, then we’re finding and investing time and money in the most exciting ideas and startups.</p>
            </HomeTextBlock>
          </div>
        </ScreenBlock>
        <ScreenBlock ref="blockStudio" customClass="page-home__screen-block--studio">
          <img src="https://placekitten.com/g/200/300"/>
        </ScreenBlock>
      </article>
    );
  }
};
