'use strict'

import '../../adaptors/server/svg4everybody';
import React from 'react';
import Meta from "react-helmet";
import TransitionManager from 'react-transition-manager';
import classnames from 'classnames';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';

// TODO: see if there's a better way to get fonts in
import '../../adaptors/server/localfont';

import window from '../../adaptors/server/window';
import '../../lib/animate';

import Flux from '../../flux';
import Nulls from '../../flux/nulls';
import Navigation from '../navigation';
import Footer from '../footer';
import Modal from '../modal';
import EntranceTransition from '../entrance-transition';
import ContactTray from '../contact-tray';
import TakeOver from '../take-over';
import FourOhFour from '../404';
import BlogCategories from '../blog-categories';
import NavigationOverlay from '../navigation-overlay';

const pageMap = {
  'home': require('../home'),
  'what-we-do': require('../what-we-do'),
  'what-we-do/case-study': require('../case-study'),
  'blog': require('../blog'),
  'blog/post': require('../post'),
  'blog/search-results': require('../search-results'),
  'legal': require('../legal'),
  'join-us': require('../join-us')
};

class PageContainer extends React.Component {
  render() {
    return (
      <div className="page-container">
        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, { transitionState: this.props.transitionState });
        })}
      </div>
    );
  }
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
  }
  componentWillUnmount() {
    Flux.removeChangeListener(this.onFlux);
  }
  render() {
    const state = this.state;
    const appClasses = classnames('app', {
      'app-404': state.currentPage === 'notfound'
    });
    const contentClasses = classnames('app-content', {
      takeover: this.showTakeover(),
      disabled: !!state.modal,
      'mobile-no-scroll': state.modal === 'blogCategories' || state.modal === 'navigation' || state.modal === 'search' || this.showTakeover()
    });
    let content;
    if(state.currentPage === 'notfound') {
      content = <div className={appClasses}>
        <Navigation pages={state.navMain} section={this.state.currentPage.split('/')[0]} page={this.state.currentPage.split('/')[1]} takeover={this.showTakeover()} />
        <FourOhFour {...this.state} />
      </div>;
    } else {
      content = (
        <div className={appClasses}>
          <Meta
            title={get(state, 'page.seo.title') || ''}
            meta={[{
              name: "description",
              content: get(state, 'page.seo.desc') || ''
            }, {
              name: "keywords",
              content: get(state, 'page.seo.keywords') || ''
            }, {
              name: "og:type",
              content: 'website'
            }, {
              name: "og:title",
              content: get(state, 'page.seo.title') || ''
            }, {
              name: "og:description",
              content: get(state, 'page.seo.desc') || ''
            }, {
              name: "og:image",
              content: get(state, 'page.seo.image') || ''
            }]}
          />
          <EntranceTransition className="nav-wrapper">
            <Navigation pages={state.navMain} section={state.currentPage.split('/')[0]} page={state.currentPage.split('/')[1]} takeover={this.showTakeover()} />
          </EntranceTransition>
          <TransitionManager component="div" className={contentClasses} duration={0}>
            <PageContainer key={state.currentPage}>
              {this.getPage(state.currentPage)}
              <Footer data={state.footer} studios={state.studios} />
            </PageContainer>
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
    const state = this.state;
    const takeover = state.takeover;
    const modalType = state.modal;
    let modal;
    if(this.showTakeover()) {
      modal = <TakeOver key="takeover" takeover={takeover} />;
    } else if(modalType) {
      let content;
      let className;
      switch(modalType) {
        case 'navigation':
          className = 'navigation';
          content = <NavigationOverlay pages={state.navMain} section={state.currentPage.split('/')[0]} />
          break;
        case 'contacts':
          className = 'tray';
          content = <ContactTray contacts={state.footer.contacts} />;
          break;
        case 'blogCategories':
          className = 'modal-blog-categories';
          content = <BlogCategories />;
          break;
      }
      modal = <Modal key={state.modal} className={className}>{content}</Modal>;
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
