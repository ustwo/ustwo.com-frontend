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
import disableScroll from 'app/lib/disable-scroll';
import env from 'app/adaptors/server/env';

// TODO: see if there's a better way to get fonts in
import 'app/adaptors/server/localfont';

import window from 'app/adaptors/server/window';
import 'app/lib/animate';

import Store from 'app/flux/store';
import Nulls from 'app/flux/nulls';
import Navigation from 'app/components/navigation';
import Modal from 'app/components/modal';
import EntranceTransition from 'app/components/entrance-transition';
import FourOhFour from 'app/components/404';
import BlogCategories from 'app/components/blog-categories';
import NavigationOverlay from 'app/components/navigation-overlay';
import Popup from 'app/components/popup';
import ScrollWrapper from 'app/components/scroll-wrapper';
import PageContent from 'app/components/page-content';
import VideoOverlay from 'app/components/video-overlay';

const pageMap = {
  'home': require('app/components/home'),
  'work': require('app/components/work'),
  'work/case-study': require('app/components/case-study'),
  'work/discovery-strategy': require('app/components/work-discovery-strategy'),
  'work/design-build': require('app/components/work-design-build'),
  'work/launch-scale': require('app/components/work-launch-scale'),
  'work/ways-of-working': require('app/components/work-ways-of-working'),
  'work/ustwo-auto': require('app/components/ustwo-auto'),
  'blog': require('app/components/blog'),
  'blog/post': require('app/components/post'),
  'legal': require('app/components/legal'),
  'join-us': require('app/components/join-us'),
  'events': require('app/components/events'),
  'events/event': require('app/components/event'),
  'ev': require('app/components/page')
};

const App = React.createClass({

  getInitialState() {
    return Object.assign({
      documentScrollPosition: 0,
      isScrolling: false,
      show: false,
      viewportDimensions: {},
      isMobile: window.innerWidth < 600
    }, this.props.state);
  },

  getDocumentScrollPosition() {
    this.setState({
      isScrolling: true,
      documentScrollPosition: document.scrollingElement.scrollTop
    });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ isScrolling: false });
    }, 1200);
  },

  getViewportDimensions() {
    const viewportDimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.setState({
      viewportDimensions,
      isMobile: viewportDimensions.width < 600
    });
  },

  componentDidMount() {
    const { page, currentPage, post, caseStudy, isScrolling, modal, popup, overflow } = this.state;

    this.setState({ show: true });
    this.getViewportDimensions();

    /* Get dimensions of viewport to calculate mousePosition and scrollPosition (for example) */
    window.addEventListener('scroll', this.getDocumentScrollPosition);
    /* Get new dimensions when device orientationchange etc */
    window.addEventListener('resize', this.getViewportDimensions);

    Store.on('change', this.onChangeStore);
  },

  componentDidUpdate(prevProps, prevState) {
    const { modal, popup, overflow } = this.state;

    if (prevState.modal != modal || prevState.popup != popup || prevState.overflow != overflow) {
      if (modal || popup || overflow === 'hidden') {
        disableScroll.on();
      } else if (modal === null || popup === null || overflow === 'auto') {
        disableScroll.off();
      }
    }
  },

  componentWillUnmount() {
    Store.removeListener('change', this.onChangeStore);
    window.removeEventListener('scroll', this.getDocumentScrollPosition);
    window.removeEventListener('resize', this.getViewportDimensions);
  },

  onChangeStore(state) {
    this.setState(state);
  },

  renderModal() {
    const { modal, navMain, currentPage, footer, videoOverlaySrc } = this.state;
    let modalContent, className, content;
    if (modal) {
      switch(modal) {
        case 'menu':
          className = 'menu';
          content = (
            <NavigationOverlay
              pages={navMain}
              section={currentPage.split('/')[0]}
            />
          );
          break;
        case 'blogCategories':
          className = 'modal-blog-categories';
          content = <BlogCategories />;
          break;
        case 'videoOverlay':
          className = 'modal-video-overlay';
          content = (
            <VideoOverlay
              src={videoOverlaySrc}
            />
          );
          break;
      }
      modalContent = <Modal key={modal} className={className}>{content}</Modal>;
    }
    return (
      <TransitionManager
        component="div"
        className="app__modal"
        duration={320}
      >
        {modalContent}
      </TransitionManager>
    );
  },

  renderPopup() {
    const { popup: popupType, documentScrollPosition, viewportDimensions, isMobile } = this.state;
    let popup;
    if (!!popupType) {
      popup = (
        <Popup
          key={popupType}
          type={popupType}
          className={popupType}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          isMobile={isMobile}
        />
      );
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
    const { currentPage, show, popup, showPopup, showRollover, menuHover, modal,
      viewportDimensions, page, post, caseStudy, navMain, documentScrollPosition,
      venturesPosition, footer, studios, overflow, isMobile,
      setWindowHeight, testimonialsPosition } = this.state;

    const appClasses = classnames('app', `page-${currentPage}`, {
      'show': show,
      'app-404': currentPage === 'notfound',
      'overflow-hidden': popup
    });
    const contentClasses = classnames('app-content', showPopup, showRollover, menuHover, {
      'show': show,
      'disabled': !!modal,
      'mobile-no-scroll': modal,
    });

    let styles;
    if (env.Modernizr.touchevents) {
      styles = {
        height: `${setWindowHeight}px`
      }
    }

    const navigation = (
      <Navigation
        pages={navMain}
        section={currentPage.split('/')[0]}
        page={currentPage.split('/')[1]}
        documentScrollPosition={documentScrollPosition}
        venturesPosition={venturesPosition}
        testimonialsPosition={testimonialsPosition}
        modal={modal}
        viewportDimensions={viewportDimensions}
        loaded={show}
        caseStudy={caseStudy}
      />
    );

    let content;
    if (currentPage === 'notfound') {
      content = (
        <div className={appClasses}>
          {navigation}
          <FourOhFour {...this.state} />
          {this.renderModal()}
        </div>
      );
    } else {
      content = (
        <div className={appClasses} style={styles}>
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
            {navigation}
          </EntranceTransition>
          <PageContent
            key={currentPage}
            extraClasses={contentClasses}
            pageMap={pageMap}
            pageState={this.state}
            currentPage={currentPage}
            viewportDimensions={viewportDimensions}
            documentScrollPosition={documentScrollPosition}
          />
          {this.renderModal()}
          {this.renderPopup()}
        </div>
      );
    }
    return content;
  }
});

export default App;
