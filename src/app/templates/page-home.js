'use strict';

import React from 'react';

import ScrollMagic from '../../server/adaptors/scroll-magic';
import Tracking from '../../server/adaptors/tracking';
import window from '../../server/adaptors/window';
import Track from '../../server/adaptors/track';

import DownChevron from '../elements/down-chevron';
import SVG from '../elements/svg';
import WordAnimation from '../elements/word-animation';
import Rotator from '../elements/rotator';
import EntranceTransition from '../elements/entrance-transition';

import BoldHeader from '../components/bold-header';
import HomeTextBlock from '../components/home-text-block';
import ScreenBlock from '../components/screen-block';

export default class PageHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [
        {
          blockReference: () => {return React.findDOMNode(this.refs.blockWelcome)},
          hexColour: '6114CC'
        },
        {
          blockReference: () => {return React.findDOMNode(this.refs.blockClient)},
          hexColour: '009CF3'
        },
        {
          blockReference: () => {return React.findDOMNode(this.refs.blockOwnStuff)},
          hexColour: 'FFBF02'
        },
        {
          blockReference: () => {return React.findDOMNode(this.refs.blockVenture)},
          hexColour: 'F9615B'
        }
      ]
    };
  }
  animateChevron = (event) => {
    if(this.refs.downChevron) {
      this.refs.downChevron.resetAnim();
      this.refs.downChevron.anim();
    }
  }
  setupScrollMagic = () => {
    let pageElement = React.findDOMNode(this);
    this.Tracking.addPageScrollTracking('home', pageElement);

    if (!env.Modernizr.touchevents && window.innerWidth > 480) {
      let scrollController = this.Tracking.scrollController;
      let blockWelcome = this.state.blocks[0].blockReference();
      // set initial colour – we need to do this due to having an offset
      pageElement.style.backgroundColor = '#' + this.state.blocks[0].hexColour;

      this.scrollSceneChevron = new ScrollMagic.Scene({
          triggerElement: blockWelcome,
          triggerHook: 'onLeave',
          duration: () => {return blockWelcome.clientHeight * 0.7}
        })
        .addTo(scrollController);

      this.colourBlockScenes = [];
      this.state.blocks.forEach((block, index) => {
        // The following has been commented out so we can use the temporary solution of using jpgs in
        // the css (for mobile optimisation). background: transaprent is then added in the home css at the large
        // breakpoint to allow us to see the scrollmagic underneath on large screen sizes
        // block.blockReference().style.backgroundColor = 'transparent';
        if (index > 0) {
          this.colourBlockScenes.push(this.createColourBlockScene(scrollController, pageElement, block.blockReference(), this.state.blocks[index - 1].hexColour, block.hexColour));
        }
      });
    }
  }
  teardownScrollMagic = () => {
    this.Tracking.removePageScrollTracking();

    if (!env.Modernizr.touchevents && window.innerWidth > 480) {
      this.scrollSceneChevron.remove();
      this.colourBlockScenes.forEach((scene) => {
        scene.remove();
      });
    }
  }
  createColourBlockScene = (scrollController, pageElement, blockReference, hexColour1, hexColour2) => {
    return new ScrollMagic.Scene({
        triggerElement: blockReference,
        triggerHook: 'onEnter',
        offset: blockReference.clientHeight * 0.25,
        duration: () => {return blockReference.clientHeight * 0.5}
      })
      .addTo(scrollController)
      // .addIndicators() // add indicators (requires plugin)
      .on('progress', (e) => {
        window.requestAnimationFrame(() => {
          pageElement.style.backgroundColor = '#' + this.blendColours(hexColour1, hexColour2, e.progress);
        });
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
  componentWillMount() {
    this.Tracking = new Tracking();
  }
  componentDidMount() {
    this.setupScrollMagic();
    this.animTimeout = setTimeout(() => {
      this.animateChevron();
    }, 2500);
  }
  componentWillUnmount() {
    this.teardownScrollMagic();
    clearTimeout(this.animTimeout);
  }
  render() {
    const headlineWordsAnimationOptions = {
      ease: Power2.easeOut,
      opacity: 0,
      y: 30
    };
    // Show only the final frame of the Chevron animation on mobile
    let Chevron;
    if (window.innerWidth <= 480) {
      Chevron = (<div className="down-chevron">
        <svg ref="animsvg" title="Down arrow" role="img" viewBox="0 0 400 200"><g>
        <path d="M195.864 143.667c19.556-14.667 39.556-28.89 59.11-43.556 2.224 2.67 6.224 8 8.446 10.67-22.222 16.89-45.778 32.45-67.556 50.67-21.778-17.78-44.89-33.33-67.11-50.22 2.22-2.66 6.22-8 8-11.11 20 14.67 39.555 29.33 59.11 43.56z"/>
      </g></svg></div>);
    } else {
      Chevron = <DownChevron ref="downChevron" onClick={this.onClickDownChevron} />;
    }
    // End Chevron
    return (
      <article className="page-home">
        <ScreenBlock ref="blockWelcome" customClass="welcome" hexColour={'#' + this.state.blocks[0].hexColour}>
          <EntranceTransition className="image-entrance">
            <div className="headline-image"></div>
          </EntranceTransition>
          <EntranceTransition className="title-entrance">
            <div className="headline-text">
              <BoldHeader colour="white">
                <WordAnimation delay={1} duration={0.4} options={headlineWordsAnimationOptions}>
                  We're a digital product studio
                </WordAnimation>
              </BoldHeader>
            </div>
          </EntranceTransition>
          {Chevron}
        </ScreenBlock>
        <ScreenBlock ref="blockClient" customClass="client" hexColour={'#' + this.state.blocks[1].hexColour}>
          <div className="block-parent">
            <div className="block-child">
              <div className="image-container">
                <div className="harvey-nicks-device"></div>
                <SVG className="harvey-nicks-shape-3" role="presentation" spritemapID='HarveyShape3' />
                <SVG className="harvey-nicks-shape-4" role="presentation" spritemapID='HarveyShape4' />
                <SVG className="harvey-nicks-shape-1" role="presentation" spritemapID='HarveyShape1' />
                <SVG className="harvey-nicks-shape-2" role="presentation" spritemapID='HarveyShape2' />
              </div>
            </div>
          </div>
          <div className="text-block">
            <HomeTextBlock title="Innovative client work">
              <p>We work with big brands to solve the huge problems. We partner with smart clients to launch new products, services and companies that are of strategic importance and reliant on innovation.</p>
            </HomeTextBlock>
          </div>
        </ScreenBlock>
        <ScreenBlock ref="blockOwnStuff" customClass="own-stuff" hexColour={'#' + this.state.blocks[2].hexColour}>
          <div className="block-parent">
            <div className="block-child">
              <div className="image-container">
                <div className="monument-device"></div>
                <SVG className="monument-award-1" role="presentation" spritemapID='MonumentAward1' />
                <SVG className="monument-award-2" role="presentation" spritemapID='MonumentAward2' />
                <SVG className="monument-award-3" role="presentation" spritemapID='MonumentAward3' />
              </div>
            </div>
          </div>
          <div className="text-block">
            <HomeTextBlock title="Award-winning own products and games" colour="nonBlack" childColour="nonBlack">
              <p>We invest time, money and passion to learn by doing – creating products for ourselves and the world. Whether our iconic game Monument Valley or innovative technical platform Wayfindr, we create products with passion from conception to launch and beyond.</p>
            </HomeTextBlock>
          </div>
        </ScreenBlock>
        <ScreenBlock ref="blockVenture" customClass="ventures" hexColour={'#' + this.state.blocks[3].hexColour}>
          <div className="block-parent">
            <div className="block-child">
              <div className="image-container">
                <div className="dice-screen-anim"></div>
                <div className="dice-device"></div>
                <SVG className="dice-logo" role="presentation" spritemapID='dicelogo' />
              </div>
            </div>
          </div>
          <div className="text-block">
            <HomeTextBlock title="Launching new ventures" colour="white" childColour="white">
              <p>Working with people who know their industry inside-out gets us super excited. We partner with the world’s leading experts, entrepreneurs and investors by offering our expertise, technology or investment.</p>
            </HomeTextBlock>
          </div>
        </ScreenBlock>
      </article>
    );
  }
  onClickDownChevron() {
    Track('send', {
      'hitType': 'event',
      'eventCategory': 'hub_page',
      'eventAction': 'click_animated_chevron',
      'eventLabel': 'home'
    });
  }
};
