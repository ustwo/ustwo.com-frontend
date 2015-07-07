'use strict'

import React from 'react';
import 'Fetch';
// TODO: see if there's a better way to get fonts in
import './localfont.js';
import 'TweenMax';
import 'Tween';
import 'Timeline';
import 'TweenLite-ScrollToPlugin';
import 'TweenLite-EasePack';

import Navigation from './modules/navigation.jsx';
import PageHome from './templates/page-home.jsx';
import EntranceAnimation from './elements/entrance-animation.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        pages: []
      }
    }
  }
  componentDidMount() {
    // This is currently broken in IE11: https://github.com/github/fetch/issues/114
    fetch(this.props.url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({data: json});
    }).catch(function(ex) {
      console.warn('App data JSON parsing failed:', ex);
    });
  }
  render() {
    const renderData = this.state.data;
    const animationOptions = {
      ease: Power2.easeOut,
      y: -68
    };
    return (
      <div>
        <EntranceAnimation delay={1} duration={0.3} options={animationOptions} findElement={element => element.children[0]}>
          <Navigation data={renderData.pages} customClass="transparent-white" />
        </EntranceAnimation>
        <PageHome/>
      </div>
    );
  }
};

React.render(
  <App url="data/gulpdata.json" />,
  document.getElementById('pageContent')
);
