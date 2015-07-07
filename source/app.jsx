'use strict'

import 'babelify/polyfill';
import React from 'react';
import 'Fetch';
import TransitionManager from 'react-transition-manager';
// TODO: see if there's a better way to get fonts in
import './localfont.js';
import 'Tween';
import 'Timeline';
import 'TweenLite-ScrollToPlugin';
import 'TweenLite-EasePack';
import 'browsernizr/test/history';

import Router from './flux/router';
import Store from './flux/store';
import Navigation from './modules/navigation.jsx';
import EntranceAnimation from './elements/entrance-animation.jsx';

const pageMap = {
  home: require('./templates/page-home.jsx'),
  work: require('./templates/page-work.jsx')
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getData();
    this.onStoreChange = this.onStoreChange.bind(this);
  }
  componentWillMount() {
    Router.init(this.props.initialUrl);
  }
  componentDidMount() {
    Store.addChangeListener(this.onStoreChange);
  }
  componentWillUnmount() {
    Store.removeChangeListener(this.onStoreChange);
  }
  onStoreChange() {
    this.setState(Store.getData());
  }
  render() {
    const renderData = this.state.data;
    const animationOptions = {
      ease: Power2.easeOut,
      y: -68,
      clearProps: 'transform'
    };
    let content;
    if(this.state.page === 'notfound') {
      content = <div className="app">404</div>;
    } else {
      content = (
        <div className="app">
          <EntranceAnimation delay={1} duration={0.3} options={animationOptions} findElement={element => element.children[0]}>
            <Navigation data={renderData.pages} customClass="transparent-white" />
          </EntranceAnimation>
          <TransitionManager component="div" className="app__stage" duration="500">
            <div className="app__stage__page-container" key={this.state.page}>
              {this.getPage(this.state.page)}
            </div>
          </TransitionManager>
        </div>
      );
    }
    return content;
  }
  getPage(pageId) {
    return React.createElement(pageMap[pageId], this.state);
  }
};
