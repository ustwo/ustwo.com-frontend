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
import EntranceAnimation from './elements/entrance-animation';
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
  'privacy': require('./templates/page-privacy'),
  'join-us': require('./templates/page-join-us')
};

function renderTitle(state) {
  let title = [];
  switch(state.currentPage) {
    case 'home':
      break;
    case 'what-we-do/case-study':
      title.push(get(state, 'caseStudy.name'));
      break;
    case 'blog/post':
      title.push(get(state, 'post.title.rendered'));
      break;
    default:
      title.push(find(state.pages, 'id', state.currentPage).title);
      break;
  }
  title.push('ustwo');
  return title.join(' | ');
}

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
    const animationOptions = {
      ease: Power2.easeOut,
      y: -68,
      clearProps: 'transform'
    };
    const headerDelay = 0.5 + (state.takeover !== Nulls.takeover ? 2 : 0);
    const appClasses = classnames('app', {
      'app-404': state.currentPage === 'notfound'
    });
    const contentClasses = classnames('app__content', {
      takeover: state.currentPage === 'home' && state.takeover !== Nulls.takeover
    });
    let content;
    if(this.state.showNav) {
      window.document.body.classList.add('nav-open');
    } else {
      window.document.body.classList.remove('nav-open');
    }
    if(state.currentPage === 'notfound') {
      content = <div className={appClasses}>
        <Navigation pages={state.pages} section={this.state.currentPage.split('/')[0]} page={this.state.currentPage.split('/')[1]} takeover={this.state.takeover !== Nulls.takeover} open={this.state.showNav} />
        <FourOhFour {...this.state} />
      </div>;
    } else {
      content = (
        <div className={appClasses}>
          {/*<Meta
            title={renderTitle(state)}
            meta={[{
              name: "description",
              content: `ustwo website, ${state.currentPage} page`
            }, {
              name: "keywords",
              content: `ustwo`
            }]}
          />*/}
          <EntranceAnimation className="nav-wrapper" delay={headerDelay} duration={0.5} options={animationOptions} findElement={element => element.children[0]}>
            <Navigation pages={state.pages} section={state.currentPage.split('/')[0]} page={state.currentPage.split('/')[1]} takeover={state.takeover !== Nulls.takeover} open={state.showNav} />
          </EntranceAnimation>
          <TransitionManager component="div" className={contentClasses} duration="500">
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
    if(this.state.takeover !== Nulls.takeover && this.state.currentPage === 'home') {
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
  getPage(pageId) {
    return React.createElement(pageMap[pageId], this.state);
  }
};
