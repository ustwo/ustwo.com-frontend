'use strict'

import 'babelify/polyfill';
import React from 'react';
import 'Fetch';
// TODO: see if there's a better way to get fonts in
import './localfont.js';
import 'Tween';
import 'Timeline';
import 'TweenLite-ScrollToPlugin';
import 'TweenLite-EasePack';
import assign from 'lodash/object/assign';
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
    let app;
    if(this.state.page === 'notfound') {
      app = <p>404</p>
    } else {
      app = (
        <div>
          <EntranceAnimation delay={1} duration={0.3} options={animationOptions} findElement={element => element.children[0]}>
            <Navigation data={renderData.pages} customClass="transparent-white" />
          </EntranceAnimation>
          {this.getPage(this.state.page)}
        </div>
      );
    }
    return app;
  }
  getPage(pageId) {
    return React.createElement(pageMap[pageId], assign({
      key: pageId
    }, this.state));
  }
};

React.render(
  <App />,
  document.getElementById('pageContent')
);
