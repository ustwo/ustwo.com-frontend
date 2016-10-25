'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import MediaQuery from 'react-responsive';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';
import getFeaturedImage from 'app/lib/get-featured-image';
import blendColours from 'app/lib/blend-colours';

import ScrollMagic from 'app/adaptors/server/scroll-magic';
import Tracking from 'app/adaptors/server/tracking';
import window from 'app/adaptors/server/window';
import Track from 'app/adaptors/server/track';
import env from 'app/adaptors/server/env';

import DownChevron from 'app/components/down-chevron';
import SVG from 'app/components/svg';
import WordAnimation from 'app/components/word-animation';
import EntranceTransition from 'app/components/entrance-transition';
import Rimage from 'app/components/rimage';

import BoldHeader from 'app/components/bold-header';
import HomeTextBlock from 'app/components/home-text-block';
import ScreenBlock from 'app/components/screen-block';
import RelatedContent from 'app/components/related-content';

const PageHome = React.createClass({
  mixins: [getScrollTrackerMixin('home')],
  getInitialState() {
    return {
      chevronLoaded: false
    }
  },
  animateChevron(event) {
    if(this.refs.downChevron) {
      this.refs.downChevron.resetAnim();
      this.refs.downChevron.anim();
    }
  },
  setupScrollMagic() {
    const { page } = this.props;
    const blocks = get(page, 'page_builder', []);
    let pageElement = React.findDOMNode(this);
    this.Tracking.addPageScrollTracking('home', pageElement);

    if (!env.Modernizr.touchevents && window.innerWidth > 480) {
      let scrollController = this.Tracking.scrollController;
      let blockWelcome = {
        attr: {
          background_colour: {
            value: get(page, 'colors.bg')
          }
        }
      };
      let blockWelcomeDom = React.findDOMNode(this.refs.blockWelcome);
      blockWelcomeDom.style.backgroundColor = 'transparent';
      // set initial colour – we need to do this due to having an offset
      pageElement.style.backgroundColor = get(page, 'colors.bg');

      this.scrollSceneChevron = new ScrollMagic.Scene({
          triggerElement: blockWelcomeDom,
          triggerHook: 'onLeave',
          duration: () => {return blockWelcomeDom.clientHeight * 0.7}
        })
        .addTo(scrollController);

      this.colourBlockScenes = [];
      blocks.forEach((block, index) => {
        const blockDom = React.findDOMNode(this.refs[`block${index}`]);
        const previousBlock = blocks[index - 1] || blockWelcome;
        blockDom.style.backgroundColor = 'transparent';
        this.colourBlockScenes.push(this.createColourBlockScene(scrollController, pageElement, blockDom, get(previousBlock, 'attr.background_colour.value'), get(block, 'attr.background_colour.value')));
      });
    }
  },
  teardownScrollMagic() {
    this.Tracking.removePageScrollTracking();

    if (!env.Modernizr.touchevents && window.innerWidth > 480) {
      this.scrollSceneChevron.remove();
      this.colourBlockScenes.forEach((scene) => {
        scene.remove();
      });
    }
  },
  createColourBlockScene(scrollController, pageElement, blockReference, hexColour1, hexColour2) {
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
          pageElement.style.backgroundColor = '#' + blendColours(hexColour1, hexColour2, e.progress);
        });
    });
  },
  componentWillMount() {
    this.Tracking = new Tracking();
  },
  componentDidMount() {
    this.setupScrollMagic();
    this.animTimeout = setTimeout(() => {
      this.animateChevron();
      this.setState({
        chevronLoaded: true
      })
    }, 1500);
  },
  componentWillUnmount() {
    this.teardownScrollMagic();
    clearTimeout(this.animTimeout);
  },
  render() {
    const { page } = this.props;
    const classes = classnames('page-home', this.props.className);
    const featuredImage = getFeaturedImage(page);
    // Show only the final frame of the Chevron animation on mobile
    let Chevron;
    if (window.innerWidth <= 480) {
      Chevron = (<div className="down-chevron">
        <svg ref="animsvg" title="Down arrow" role="img" viewBox="0 0 400 200"><g>
        <path d="M195.864 143.667c19.556-14.667 39.556-28.89 59.11-43.556 2.224 2.67 6.224 8 8.446 10.67-22.222 16.89-45.778 32.45-67.556 50.67-21.778-17.78-44.89-33.33-67.11-50.22 2.22-2.66 6.22-8 8-11.11 20 14.67 39.555 29.33 59.11 43.56z"/>
      </g></svg></div>);
    } else {
      Chevron = <DownChevron ref="downChevron" onClick={this.onClickDownChevron} customClass={this.state.chevronLoaded ? 'loaded' : ''} />;
    }
    // End Chevron
    return (
      <article className={classes}>
        <ScreenBlock ref="blockWelcome" customClass="welcome" textColour={get(page, 'colors.primary')} bgColour={get(page, 'colors.bg')}>
          <EntranceTransition className="image-entrance">
            <Rimage wrap="div" className="headline-image" sizes={get(featuredImage, 'media_details.sizes')} />
          </EntranceTransition>
          <EntranceTransition className="title-entrance">
            <div className="headline-text title">
              <BoldHeader colour="white">
                <WordAnimation delay={1} duration={0.4}>
                  {get(page, 'hero.attr.heading.value')}
                </WordAnimation>
              </BoldHeader>
            </div>
          </EntranceTransition>
          {Chevron}
        </ScreenBlock>
        {this.renderFeatureBlocks()}
        {this.renderRelatedContent()}
      </article>
    );
  },
  renderFeatureBlocks() {
    const { page } = this.props;
    return get(page, 'page_builder').map((block, index) => {
      const blockAttrs = get(block, 'attr');
      return <ScreenBlock key={`block${index}`} ref={`block${index}`} textColour={get(blockAttrs, 'text_colour.value')} bgColour={get(blockAttrs, 'background_colour.value')}>
        <div className="block-parent">
          <div className="block-child">
            <MediaQuery maxWidth={480}>
              <Rimage wrap="div" className="image-container" sizes={get(blockAttrs, 'image_jpg.value.0.sizes')} />
            </MediaQuery>
            <MediaQuery minWidth={481}>
              <Rimage wrap="div" className="image-container" sizes={get(blockAttrs, 'image_png.value.0.sizes')} />
            </MediaQuery>
          </div>
        </div>
        <div className="text-block">
          <HomeTextBlock title={get(blockAttrs, 'heading.value')} colour={get(blockAttrs, 'text_colour.value')}>
            {get(block, 'attr.description.value')}
          </HomeTextBlock>
        </div>
      </ScreenBlock>;
    });
  },
  renderRelatedContent() {
    let relatedContent;
    if(this.props.relatedContent.length) {
      relatedContent = <RelatedContent content={this.props.relatedContent} />
    }
    return relatedContent;
  },
  onClickDownChevron() {
    Track('send', {
      'hitType': 'event',
      'eventCategory': 'hub_page',
      'eventAction': 'click_animated_chevron',
      'eventLabel': 'home'
    });
  }
});

export default PageHome;
