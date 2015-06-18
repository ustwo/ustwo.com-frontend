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

// Modules
import Navigation from './modules/navigation.jsx';

const Styleguide = React.createClass({
  displayName: 'Styleguide',
  getInitialState() {
    return {data: {
      colours: {},
      pages: []
    }};
  },
  componentDidMount() {
    fetch(this.props.url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({data: json});
    }).catch(function(ex) {
      console.warn('Styleguide data JSON parsing failed:', ex);
    });
  },
  render() {
    const renderData = this.state.data;
    const colourSwatches = Object.keys(renderData.colours).map(function (colour, index) {
      let classes = colour + ' colour';
      return (
        <article key={colour} className={classes}>
          <section className="swatch">{renderData.colours[colour]}</section>
          <section className="name">{colour}</section>
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
        <StyleGuideItem title="Navigation Link" description="Link item for large screen navigation.">
          <NavigationLink url="" colour="marshPassion">Link</NavigationLink>
        </StyleGuideItem>
        <h2>Components</h2>
        <h2>Modules</h2>
        <StyleGuideItem title="Navigation" description="Site navigation.">
          <div className="fix---nav">
            <Navigation data={renderData.pages} />
          </div>
        </StyleGuideItem>
        <h2>Templates</h2>
      </section>
    );
  }
});

export default Styleguide;

React.render(
  <Styleguide url="data/gulpdata.json" />,
  document.getElementById('pageContent')
);
