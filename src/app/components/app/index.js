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

// TODO: see if there's a better way to get fonts in
import 'app/adaptors/server/localfont';

import window from 'app/adaptors/server/window';
import 'app/lib/animate';

import Store from 'app/flux/store';
import Nulls from 'app/flux/nulls';
import PageContainer from 'app/components/page-container';
import Navigation from 'app/components/navigation';
import Modal from 'app/components/modal';
import EntranceTransition from 'app/components/entrance-transition';
import ContactTray from 'app/components/contact-tray';
import TakeOver from 'app/components/take-over';
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

const App = React.createClass({

  getInitialState() {
    return Object.assign({
      documentScrollPosition: 0,
      isScrolling: false,
      show: false,
      viewportDimensions: {},
      isMobile: window.innerWidth < 600,
    }, this.props.state);
  },

  getDocumentScrollPosition() {
    this.setState({
      isScrolling: true,
      documentScrollPosition: document.scrollingElement.scrollTop
    });

    let timeout = null;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
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

  componentWillMount() {
    this.getViewportDimensions();
  },

  componentDidMount() {
    const { page, currentPage, post, caseStudy, isScrolling, modal, popup, overflow } = this.state;

    this.setState({ show: true });
    this.getViewportDimensions();

    /* Get dimensions of viewport to calculte mousePosition and scrollPosition (for example) */
    window.addEventListener('scroll', this.getDocumentScrollPosition.bind(this), false);
    /* Get new dimensions when device orientationchange etc */
    window.addEventListener('resize', this.getViewportDimensions.bind(this), false);

    Store.on('change', this.onChangeStore);

    /* TODO: What do we need this for?  */
    // window.addEventListener("orientationchange", function() {
    //   if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    //     document.documentElement.innerHTML = document.documentElement.innerHTML;
    //   }
    // }, false);
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

    // if (prevState.currentPage != this.state.currentPage && env.Modernizr.touchevents) {
      // this.setFixedHeight.bind(this);
    // }
  },

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.isScrolling) {
  //     setTimeout(() => {
  //       this.setState({ isScrolling: false })
  //     }, 50)
  //   }
  // },

  componentWillUnmount() {
    Store.removeListener('change', this.onChangeStore);
    window.removeEventListener('scroll', this.getDocumentScrollPosition.bind(this), false);
    window.removeEventListener('resize', this.getViewportDimensions.bind(this), false);
  },

  onChangeStore(state) {
    this.setState(state);
  },

  showTakeover() {
    const { currentPage, takeover } = this.state;
    return currentPage === 'home' && takeover && !takeover.seen;
  },

  renderModal() {
    const { takeover, modal } = this.state;
    let modalContent, className, content;
    if (this.showTakeover()) {
      modalContent = <TakeOver key="takeover" takeover={takeover} />;
    } else if (modal) {
      switch(modal) {
        case 'menu':
          className = 'menu';
          content = (
            <NavigationOverlay
              pages={this.state.navMain}
              section={this.state.currentPage.split('/')[0]}
            />
          );
          break;
        case 'contacts':
          className = 'tray';
          content = <ContactTray contacts={state.footer.contacts} />;
          break;
        case 'blogCategories':
          className = 'modal-blog-categories';
          content = <BlogCategories />;
          break;
        case 'videoOverlay':
          className = 'modal-video-overlay';
          content = (
            <VideoOverlay
              src={this.state.videoOverlaySrc}
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
    const { currentPage, show, popup, showPopup, showRollover, menuHover, modal, viewportDimensions,
      homeIntroVideoViewed, homeLoaderShown, page, post, caseStudy, navMain,
      documentScrollPosition, venturesPosition, footer, studios, heroVideoReady, overflow, isMobile, loaded, setWindowHeight } = this.state;

    const appClasses = classnames('app', `page-${currentPage}`, {
      'show': show,
      'app-404': currentPage === 'notfound',
      'overflow-hidden': popup
    });
    const contentClasses = classnames('app-content', showPopup, showRollover, menuHover, {
      'show': state.show,
      'takeover': this.showTakeover(),
      'disabled': !!modal,
      'mobile-no-scroll': modal || this.showTakeover(),
    });

    const styles = {
      height: `${setWindowHeight}px`
    }

    // else if (modal === null || popup === null || overflow === 'auto') {
    //   // document.body.style.overflow = "auto";
    //   noScroll.off();
    // }
    // if (isMobile) {
    //   if (overflow === 'hidden') {
    //     document.body.style.position = "fixed";
    //   } else if (overflow === 'auto') {
    //     document.body.style.position = "initial";
    //   }
    // }

    const navigation = (
      <Navigation
        pages={navMain}
        section={currentPage.split('/')[0]}
        page={currentPage.split('/')[1]}
        takeover={this.showTakeover()}
        documentScrollPosition={documentScrollPosition}
        venturesPosition={venturesPosition}
        modal={modal}
        viewportDimensions={viewportDimensions}
        loaded={loaded}
      />
    );

    const dataLoading = !includes(spinnerBlacklist, currentPage) && !page && !post && !caseStudy;

    let content;
    if (state.currentPage === 'notfound') {
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
          <TransitionManager
            component="div"
            className="transition-page"
            duration={1000}
          >
            <PageContainer key={currentPage} extraClasses={contentClasses}>
              <PageContent
                pageMap={pageMap}
                pageState={this.state}
                currentPage={currentPage}
                dataLoading={dataLoading}
                homeIntroVideoViewed={homeIntroVideoViewed}
                homeLoaderShown={homeLoaderShown}
                heroVideoReady={heroVideoReady}
                viewportDimensions={viewportDimensions}
              />
            </PageContainer>
          </TransitionManager>
          {this.renderModal()}
          {this.renderPopup()}
        </div>
      );
    }
    return content;
  }
});

export default App;
