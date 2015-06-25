'use strict'

import React from 'react';
import '../node_modules/whatwg-fetch/fetch.js';
// TODO: see if there's a better way to get fonts in
import './localfont.js';

import StyleGuideItem from 'react-style-guide';

// Atoms
import NavigationLink from './atoms/navigation-link.jsx';
import NavigationOverlayLink from './atoms/navigation-overlay-link.jsx';
import NavigationOpenOverlayButton from './atoms/navigation-open-overlay-button.jsx';
import NavigationOverlayCloseButton from './atoms/navigation-overlay-close-button.jsx';

// Components
import BoldHeader from './components/bold-header.jsx';
import ScreenBlock from './components/screen-block.jsx';
import HomeTextBlock from './components/home-text-block.jsx';

// Modules
import Navigation from './modules/navigation.jsx';

// Templates
import PageHome from './templates/page-home.jsx';

export default class Styleguide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        colours: {},
        pages: []
      }
    }
  }
  componentDidMount() {
    fetch(this.props.url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({data: json});
      this.refs.closeButton.anim();
    }).catch(function(ex) {
      console.warn('Styleguide data JSON parsing failed:', ex);
    });
  }
  animateCloseButton = (event) => {
    this.refs.closeButton.resetAnim();
    this.refs.closeButton.anim();
  }
  render() {
    const renderData = this.state.data;
    const colourSwatches = Object.keys(renderData.colours).map(function (colour, index) {
      let classes = colour + ' colour';
      return (
        <article key={colour} className={classes}>
          <section className="swatch">{renderData.colours[colour]}<br/>{colour}</section>
        </article>
      );
    });
    return (
      <section className="styleguide__container">
        <h1>Styleguide – ustwo.com</h1>
        <h2>Atoms</h2>
        <StyleGuideItem title="Colours" description="Colours being used in the project.">
          <section className="colour-container">
            {colourSwatches}
          </section>
        </StyleGuideItem>
        <StyleGuideItem title="Typography" description="Typography being used in the project.">
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
        <StyleGuideItem title="Navigation link" description="Link item for large screen navigation.">
          <NavigationLink url="" colour="marshPassion">Link</NavigationLink>
        </StyleGuideItem>
        <StyleGuideItem title="Navigation overlay link" description="Link item for small screen navigation.">
          <section className="dark__styleguideitem__container">
            <NavigationOverlayLink url="">Link</NavigationOverlayLink>
          </section>
        </StyleGuideItem>
        <StyleGuideItem title="Navigation open overlay button" description="Menu overlay opening button for small screens.">
          <div className="openbutton__container">
            <NavigationOpenOverlayButton />
          </div>
        </StyleGuideItem>
        <StyleGuideItem title="Navigation overlay close button" description="Fancy animated close button.">
          <section className="dark__styleguideitem__container">
            <NavigationOverlayCloseButton ref="closeButton" onClose={this.animateCloseButton} />
          </section>
        </StyleGuideItem>
        <h2>Components</h2>
        <StyleGuideItem title="Bold page header" description="Big and bold header to start pages on the right foot.">
          <BoldHeader subtitle="And this is my awesome secondary line" colour="marshPassion">I'm a bold<br/>page header</BoldHeader>
          <hr/>
          <BoldHeader colour="jeezz">I work without<br/>a subtitle too!</BoldHeader>
        </StyleGuideItem>
        <StyleGuideItem title="Screen block" description="Container block which takes up the full viewport.">
          <ScreenBlock colour="marshPassion">
            <p>Globally fabricate front-end products before technically sound opportunities. Credibly enable plug-and-play alignments for exceptional infomediaries. Intrinsicly productize leading-edge convergence vis-a-vis backend scenarios.</p>
            <p>Phosfluorescently network process-centric innovation rather than timely metrics. Seamlessly expedite economically sound resources before 2.0 sources. Rapidiously provide access to inexpensive schemas vis-a-vis enterprise-wide infrastructures.</p>
          </ScreenBlock>
          <ScreenBlock colour="jeezz">
            <p><img src="https://placekitten.com/g/200/300"/></p>
          </ScreenBlock>
        </StyleGuideItem>
        <StyleGuideItem title="Home text block" description="Text block for home page.">
          <div className="u-bg-rain" style={{padding: 20}}>
            <HomeTextBlock title="Award winning own IP">
              <p>With a cherry on top!</p>
              <p>Globally fabricate front-end products before technically sound opportunities. Credibly enable plug-and-play alignments for exceptional infomediaries. Intrinsicly productize leading-edge convergence vis-a-vis backend scenarios.</p>
              <p>Phosfluorescently network process-centric innovation rather than timely metrics. Seamlessly expedite economically sound resources before 2.0 sources. Rapidiously provide access to inexpensive schemas vis-a-vis enterprise-wide infrastructures.</p>
            </HomeTextBlock>
          </div>
        </StyleGuideItem>
        <h2>Modules</h2>
        <StyleGuideItem title="Navigation" description="Site navigation.">
          <div className="fix---nav">
            <Navigation data={renderData.pages} />
          </div>
        </StyleGuideItem>
        <h2>Templates</h2>
          <StyleGuideItem title="Home page" description="The homiest pages of them all.">
            <PageHome/>
          </StyleGuideItem>
      </section>
    );
  }
};

React.render(
  <Styleguide url="data/gulpdata.json" />,
  document.getElementById('pageContent')
);
