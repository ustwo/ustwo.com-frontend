'use strict'

import 'app/adaptors/server/svg4everybody';
import React from 'react';
import Meta from "react-helmet";
import TransitionManager from 'react-transition-manager';
import classnames from 'classnames';
import { get } from 'lodash';
import find from 'lodash/collection/find';
import includes from 'lodash/collection/includes';
import Flux from 'app/flux';

// TODO: see if there's a better way to get fonts in
import 'app/adaptors/server/localfont';

import window from 'app/adaptors/server/window';
import 'app/lib/animate';

import Store from 'app/flux/store';
import Nulls from 'app/flux/nulls';
import PageContainer from 'app/components/page-container';
import Navigation from 'app/components/navigation';
import Footer from 'app/components/footer';
import Modal from 'app/components/modal';
import EntranceTransition from 'app/components/entrance-transition';
import ContactTray from 'app/components/contact-tray';
import TakeOver from 'app/components/take-over';
import FourOhFour from 'app/components/404';
import BlogCategories from 'app/components/blog-categories';
import NavigationOverlay from 'app/components/navigation-overlay';
import PageLoader from 'app/components/page-loader';
import Popup from 'app/components/popup';
import HomeLoader from 'app/components/home-loader';

const pageMap = {
  'home': require('app/components/home'),
  'what-we-do': require('app/components/what-we-do'),
  'what-we-do/case-study': require('app/components/case-study'),
  'blog': require('app/components/blog'),
  'blog/post': require('app/components/post'),
  'blog/search-results': require('app/components/search-results'),
  'legal': require('app/components/legal'),
  'join-us': require('app/components/join-us'),
  'events': require('app/components/events'),
  'events/event': require('app/components/event'),
  'ev': require('app/components/page')
};

const spinnerBlacklist = ['legal', 'blog/search-results'];

function getDocumentScrollPosition(component) {
  return () => {
    component.setState({
      documentScrollPosition: document.scrollingElement.scrollTop,
    });
  }
}

const App = React.createClass({

  getInitialState() {
    const state = this.props.state;
    state['documentScrollPosition'] = 0;
    state['scrolling'] = false;
    state['show'] = false;
    state['appLoaded'] = false;

    return state;
  },

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }.bind(this), 1000);

    document.body.style.overflow = "hidden";
    // TODO: Remove timeout and actually act as a loader (of the video)
    setTimeout(() => {
      this.setState({ appLoaded: true });
    }.bind(this), 5500);

    Store.on('change', this.onChangeStore);
    window.addEventListener('scroll', getDocumentScrollPosition(this));

    /* is the user scrolling? Turn off some unperformant css, e.g. box-shadow? */
    window.onscroll = () => {
      this.setState({ scrolling: true })
    };
    setInterval(() => {
      if (this.state.scrolling) {
        this.setState({ scrolling: false })
      }
    }, 200);
  },

  componentWillUnmount() {
    Store.removeListener('change', this.onChangeStore);
    window.removeEventListener('scroll', getDocumentScrollPosition(this));
  },

  onChangeStore(state) {
    this.setState(state);
  },

  showTakeover() {
    const { currentPage, takeover } = this.state;
    return currentPage === 'home' && takeover && !takeover.seen;
  },

  renderModal() {
    const { takeover, modal: modalType } = this.state;
    let modal, className, content;
    if (this.showTakeover()) {
      modal = <TakeOver key="takeover" takeover={takeover} />;
    } else if (modalType) {
      switch(modalType) {
        case 'menu':
          className = 'menu';
          content = <NavigationOverlay
            pages={this.state.navMain}
            section={this.state.currentPage.split('/')[0]}
          />;
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
      modal = <Modal key={modalType} className={className}>{content}</Modal>;
    }
    return (
      <TransitionManager
        component="div"
        className="app__modal"
        duration={320}
      >
        {modal}
      </TransitionManager>
    );
  },

  renderPopup() {
    const { popup: popupType } = this.state;
    let popup;
    if (!!popupType) {
      popup = <Popup key={popupType} type={popupType} className={popupType} />;
    }
    return (
      <TransitionManager
        component="div"
        className="app__popup"
        duration={320}
      >
        {popup}
      </TransitionManager>
    );
  },

  render() {
    const state = this.state;
    const appClasses = classnames('app', `page-${this.state.currentPage}`, {
      'show': state.show,
      'loaded': state.appLoaded,
      'app-404': state.currentPage === 'notfound'
    });
    const contentClasses = classnames('app-content', state.showPopup, state.showRollover, state.menuHover, {
      'takeover': this.showTakeover(),
      'disabled': !!state.modal,
      'mobile-no-scroll': state.modal || this.showTakeover(),
    });
    if (!!state.modal || !!state.popup) {
      document.body.style.overflow = "hidden";
    } else if (state.modal === null && state.appLoaded || state.popup === null && state.appLoaded) {
      document.body.style.overflow = "auto";
    }
    let content;
    if (state.currentPage === 'notfound') {
      content = <div className={appClasses}>
        <Navigation
          pages={state.navMain}
          section={state.currentPage.split('/')[0]}
          page={state.currentPage.split('/')[1]}
          takeover={this.showTakeover()}
          documentScrollPosition={this.state.documentScrollPosition}
          whereIsVentures={this.state.whereIsVentures}
          modal={this.state.modal}
        />
        <FourOhFour {...this.state} />
        {this.renderModal()}
      </div>;
    } else {
      content = <div className={appClasses}>
        <Meta
          title={get(state, 'page.seo.title') || get(state, 'post.seo.title') || ''}
          meta={[{
            name: "description",
            content: get(state, 'page.seo.desc') || get(state, 'post.seo.desc') || ''
          }, {
            name: "keywords",
            content: get(state, 'page.seo.keywords') || get(state, 'post.seo.keywords') || ''
          }, {
            property: "og:type",
            content: 'website'
          }, {
            property: "og:title",
            content: get(state, 'page.seo.title') || get(state, 'post.seo.title') || ''
          }, {
            property: "og:description",
            content: get(state, 'page.seo.desc') || get(state, 'post.seo.desc') || ''
          }, {
            property: "og:image",
            content: get(state, 'page.seo.image') || get(state, 'post.seo.image') || ''
          }]}
        />
        <EntranceTransition className="nav-wrapper">
          <Navigation
            pages={state.navMain}
            section={state.currentPage.split('/')[0]}
            page={state.currentPage.split('/')[1]}
            takeover={this.showTakeover()}
            documentScrollPosition={this.state.documentScrollPosition}
            whereIsVentures={this.state.whereIsVentures}
            modal={this.state.modal}
          />
        </EntranceTransition>
        <PageContainer key={state.currentPage} extraClasses={contentClasses}>
          {this.getPage(state.currentPage)}
          <Footer data={state.footer} studios={state.studios} currentPage={this.state.currentPage}/>
        </PageContainer>
        {this.renderModal()}
        {this.renderPopup()}
        <HomeLoader loaded={this.state.appLoaded} />
      </div>;
    }
    return content;
  },

  getPage(pageId) {
    const { currentPage, page: pageData, post, caseStudy, documentScrollPosition, scrolling} = this.state;
    let page;
    if(!includes(spinnerBlacklist, currentPage) && !pageData && !post && !caseStudy) {
      page = <PageLoader key="loader" pageId={pageId} />;
    } else {
      //   page = React.createElement(pageMap[pageId], Object.assign({ key: `page-${pageId}` }, this.state));
      page = React.createElement(pageMap[pageId], this.state);
    }
    return page;
  }
});

export default App;
