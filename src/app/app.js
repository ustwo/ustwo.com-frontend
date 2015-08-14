'use strict'

// import 'svg4everybody';
import React from 'react';
import Meta from "react-helmet";
import TransitionManager from 'react-transition-manager';
import classnames from 'classnames';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';

// TODO: see if there's a better way to get fonts in
import '../server/adaptors/localfont';
import '../server/adaptors/tween-max';
import 'gsap/src/uncompressed/TimelineLite.js';
import '../server/adaptors/scroll-to-plugin';
import 'gsap/src/uncompressed/easing/EasePack.js';

import window from '../server/adaptors/window';
import Flux from './flux';
import Nulls from './flux/nulls';
import Navigation from './modules/navigation';
import Footer from './modules/footer';
import Modal from './modules/modal';
import EntranceTransition from './elements/entrance-transition';
import ContactTray from './components/contact-tray';
import TakeOver from './modules/take-over';
import FourOhFour from './templates/page-404';

const pageMap = {
  'home': require('./templates/page-home'),
  'what-we-do': require('./templates/page-what-we-do'),
  'what-we-do/case-study': require('./templates/page-case-study'),
  'blog': require('./templates/page-blog'),
  'blog/post': require('./templates/page-post'),
  'legal': require('./templates/page-legal'),
  'privacy': require('./templates/page-privacy')
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }
  onFlux = (state) => {
    this.setState(state);
  }
  componentDidMount() {
    Flux.addChangeListener(this.onFlux);
    this.state.showNav && window.document.body.classList.add('nav-open');
  }
  componentWillUnmount() {
    Flux.removeChangeListener(this.onFlux);
  }
  render() {
    const state = this.state;
    const appClasses = classnames('app', {
      'app-404': state.currentPage === 'notfound'
    });
    const contentClasses = classnames('app__content', {
      takeover: this.showTakeover()
    });
    let content;
    if(this.state.showNav) {
      window.document.body.classList.add('nav-open');
    } else {
      window.document.body.classList.remove('nav-open');
    }
    if(state.currentPage === 'notfound') {
      content = <div className={appClasses}>
        <Navigation pages={state.pages} section={this.state.currentPage.split('/')[0]} page={this.state.currentPage.split('/')[1]} takeover={this.showTakeover()} open={this.state.showNav} />
        <FourOhFour {...this.state} />
      </div>;
    } else {
      content = (
        <div className={appClasses}>
          <Meta
            title={`${get(state, 'page.seo.title') ? get(state, 'page.seo.title') + ' | ' : ''}ustwo`}
            meta={[{
              name: "description",
              content: get(state, 'page.seo.desc') || ''
            }, {
              name: "keywords",
              content: get(state, 'page.seo.keywords') || ''
            }]}
          />
          <EntranceTransition className="nav-wrapper">
            <Navigation pages={state.pages} section={state.currentPage.split('/')[0]} page={state.currentPage.split('/')[1]} takeover={this.showTakeover()} open={state.showNav} />
          </EntranceTransition>
          <TransitionManager component="div" className={contentClasses} duration="0">
            <div className="app__stage__page-container" key={state.currentPage}>
              {this.getPage(state.currentPage)}
              <Footer data={state.footer} studios={state.studios} />
            </div>
          </TransitionManager>
          <TransitionManager component="div" className="app__modal" duration="500">
            {this.renderModal()}
          </TransitionManager>
        </div>
      );
    }
    return content;
  }
  renderModal() {
    const takeover = this.state.takeover;
    const modalType = this.state.modal;
    let modal;
    if(this.showTakeover()) {
      modal = <TakeOver key="takeover" takeover={takeover} />;
    } else if(modalType) {
      let content;
      let className;
      switch(modalType) {
        case 'contacts':
          className = 'tray';
          content = <ContactTray contacts={this.state.footer.contacts} />;
        break;
      }
      modal = <Modal key={this.state.modal} className={className}>{content}</Modal>;
    }
    return modal;
  }
  showTakeover() {
    const state = this.state;
    return state.currentPage === 'home' && state.takeover && !state.takeover.seen;
  }
  getPage(pageId) {
    return React.createElement(pageMap[pageId], this.state);
  }
};
