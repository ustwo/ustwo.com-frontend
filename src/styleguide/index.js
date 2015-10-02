'use strict'

import Env from 'env';
window.env = Env;

import React from 'react';
import TransitionManager from 'react-transition-manager';
// TODO: see if there's a better way to get fonts in
import 'localfont';
import 'browsernizr/test/history';

import Store from './flux/store';

import StyleGuideItem from './react-style-guide';

// Elements
import NavigationLink from './navigation-link';
import NavigationOverlayLink from './navigation-overlay-link';
import NavigationOpenOverlayButton from './navigation-open-overlay-button';
import NavigationOverlayCloseButton from './close-button';
import DownChevron from './down-chevron';

// Components
import BoldHeader from './bold-header';
import ScreenBlock from './screen-block';
import HomeTextBlock from './home-text-block';

// Modules
import Navigation from './navigation';
import Footer from './footer';

// Templates
import PageHome from './page-home';

export default class Styleguide extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getData();
  }
  animateCloseButton = (event) => {
    this.refs.closeButton.resetAnim();
    this.refs.closeButton.anim();
  }
  animateDownChevron = (event) => {
    this.refs.downChevron.resetAnim();
    this.refs.downChevron.anim();
  }
  onStoreChange = () => {
    this.setState(Store.getData());
  }
  componentWillMount() {
    window.Tracking = {
      addPageScrollTracking: function () {},
      removePageScrollTracking: function () {}
    }
  }
  componentDidMount() {
    Store.addChangeListener(this.onStoreChange);
    this.animateCloseButton();
    this.animateDownChevron();
  }
  componentWillUnmount() {
    Store.removeChangeListener(this.onStoreChange);
    window.Tracking = null;
  }
  render() {
    const state = this.state;
    const colourSwatches = Object.keys(state.colours).map(function (colour, index) {
      let classes = colour + ' colour';
      return (
        <article key={colour} className={classes}>
          <section className="swatch">{state.colours[colour]}<br/>{colour}</section>
        </article>
      );
    });
    return (
      <section className="styleguide__container">
        <h1>Styleguide – ustwo.com</h1>
        {/* ELEMENTS ------------------------------------------------------------------------------------------------------- */}
        <h2>1. Elements</h2>
        <StyleGuideItem title="1.1. Colours" description="Colours being used in the project.">
          <section className="colour-container">
            {colourSwatches}
          </section>
        </StyleGuideItem>
        <StyleGuideItem title="1.2. Typography" description="Typography being used in the project.">
          <section>
            <h1>First level heading</h1>
            <h2>Second level heading</h2>
            <h3>Third level heading</h3>
            <h4>Fourth level heading</h4>
            <h5>Fifth level heading</h5>
            <h6>Sixth level heading</h6>
            <p>Paragraph: Appropriately enable scalable best practices and flexible niches. Dramatically mesh economically sound deliverables with out-of-the-box niche markets. Appropriately exploit multimedia based bandwidth whereas backward-compatible innovation.<br/>Rapidiously utilize just in time supply chains whereas intermandated leadership. Energistically formulate optimal users before resource-leveling testing procedures. Authoritatively optimize cost effective networks after covalent quality vectors.</p>
          </section>
        </StyleGuideItem>
        <StyleGuideItem title="1.3. Navigation link" description="Link item for large screen navigation.">
          <NavigationLink url="" colour="marshPassion">Link</NavigationLink>
        </StyleGuideItem>
        <StyleGuideItem title="1.4. Navigation overlay link" description="Link item for small screen navigation.">
          <section className="dark__styleguideitem__container">
            <NavigationOverlayLink url="">Link</NavigationOverlayLink>
          </section>
        </StyleGuideItem>
        <StyleGuideItem title="1.5. Navigation open overlay button" description="Menu overlay opening button for small screens.">
          <div className="openbutton__container">
            <NavigationOpenOverlayButton />
          </div>
        </StyleGuideItem>
        <StyleGuideItem title="1.6. Navigation overlay close button" description="Fancy animated close button.">
          <section className="dark__styleguideitem__container">
            <NavigationOverlayCloseButton ref="closeButton" onClose={this.animateCloseButton} />
          </section>
        </StyleGuideItem>
        <StyleGuideItem title="1.7. Down chevron" description="Fancy animated down chevron.">
          <section className="dark__styleguideitem__container">
            <DownChevron ref="downChevron" onClick={this.animateDownChevron} />
          </section>
        </StyleGuideItem>
        {/* COMPONENTS ------------------------------------------------------------------------------------------------------- */}
        <h2>2. Components</h2>
        <StyleGuideItem title="2.1. Bold header" description="Big and bold header to start pages on the right foot.">
          <BoldHeader subtitle="And this is my awesome secondary line" colour="marshPassion">I'm a bold<br/>page header</BoldHeader>
          <hr/>
          <BoldHeader colour="jeezz">I work without<br/>a subtitle too!</BoldHeader>
        </StyleGuideItem>
        <StyleGuideItem title="2.2. Screen block" description="Container block which takes up the full viewport.">
          <ScreenBlock colour="marshPassion">
            <p>Globally fabricate front-end products before technically sound opportunities. Credibly enable plug-and-play alignments for exceptional infomediaries. Intrinsicly productize leading-edge convergence vis-a-vis backend scenarios.</p>
            <p>Phosfluorescently network process-centric innovation rather than timely metrics. Seamlessly expedite economically sound resources before 2.0 sources. Rapidiously provide access to inexpensive schemas vis-a-vis enterprise-wide infrastructures.</p>
          </ScreenBlock>
          <ScreenBlock hexColour="#777777">
            <p><img src="https://placekitten.com/g/200/300"/></p>
          </ScreenBlock>
        </StyleGuideItem>
        <StyleGuideItem title="2.3. Home text block" description="Text block for home page.">
          <div className="u-bg-rain" style={{padding: 20}}>
            <HomeTextBlock title="Award winning own IP">
              <p>With a cherry on top!</p>
              <p>Globally fabricate front-end products before technically sound opportunities. Credibly enable plug-and-play alignments for exceptional infomediaries. Intrinsicly productize leading-edge convergence vis-a-vis backend scenarios.</p>
              <p>Phosfluorescently network process-centric innovation rather than timely metrics. Seamlessly expedite economically sound resources before 2.0 sources. Rapidiously provide access to inexpensive schemas vis-a-vis enterprise-wide infrastructures.</p>
            </HomeTextBlock>
          </div>
        </StyleGuideItem>
        {/* MODULES ------------------------------------------------------------------------------------------------------- */}
        <h2>3. Modules</h2>
        <StyleGuideItem title="3.1. Navigation" description="Site navigation.">
          <div className="fix-nav">
            <Navigation pages={state.pages} />
          </div>
        </StyleGuideItem>
        <StyleGuideItem title="3.2. Footer" description="Site footer.">
          <Footer data={state.studios} />
        </StyleGuideItem>
        {/* TEMPLATES ------------------------------------------------------------------------------------------------------- */}
        <h2>4. Templates</h2>
          <StyleGuideItem title="4.1. Home page" description="The homiest pages of them all.">
            <PageHome/>
          </StyleGuideItem>
      </section>
    );
  }
};

React.render(
  <Styleguide />,
  document.getElementById('pageContent')
);
