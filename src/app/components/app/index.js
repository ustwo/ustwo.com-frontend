'use strict'

import 'app/adaptors/server/svg4everybody';
import React from 'react';
import Meta from "react-helmet";
import TransitionManager from 'react-transition-manager';
import classnames from 'classnames';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import includes from 'lodash/collection/includes';

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
  'events/event': require('app/components/event')
};

const spinnerBlacklist = ['legal', 'blog/search-results'];

const App = React.createClass({
  getInitialState() {
    return this.props.state;
  },
  componentDidMount() {
    Store.on('change', this.onChangeStore);
  },
  componentWillUnmount() {
    Store.removeListener('change', this.onChangeStore);
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
    let modal;
    if (this.showTakeover()) {
      modal = <TakeOver key="takeover" takeover={takeover} />;
    } else if (modalType) {
      let content;
      let className;
      switch(modalType) {
        case 'navigation':
          className = 'navigation';
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
    return modal;
  },
  render() {
    const state = this.state;
    const appClasses = classnames('app', {
      'app-404': state.currentPage === 'notfound'
    });
    const contentClasses = classnames('app-content', {
      'takeover': this.showTakeover(),
      'disabled': !!state.modal,
      'mobile-no-scroll': state.modal || this.showTakeover()
    });
    let content;
    if (state.currentPage === 'notfound') {
      content = <div className={appClasses}>
        <Navigation
          pages={state.navMain}
          section={state.currentPage.split('/')[0]}
          page={state.currentPage.split('/')[1]}
          takeover={this.showTakeover()}
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
          />
        </EntranceTransition>
        <PageContainer key={state.currentPage} extraClasses={contentClasses}>
          <TransitionManager
            component="div"
            className="page-loader-container"
            duration={700}
          >
            {this.getPage(state.currentPage)}
          </TransitionManager>
          <Footer data={state.footer} studios={state.studios} currentPage={this.state.currentPage}/>
        </PageContainer>
        <TransitionManager
          component="div"
          className="app__modal"
          duration={500}
        >
          {this.renderModal()}
        </TransitionManager>
      </div>;
    }
    return content;
  },
  getPage(pageId) {
    const { currentPage, page: pageData, post, caseStudy} = this.state;
    let page;
    if(!includes(spinnerBlacklist, currentPage) && !pageData && !post && !caseStudy) {
      page = <PageLoader key="loader" pageId={pageId} />;
    } else {
      page = React.createElement(pageMap[pageId], Object.assign({ key: `page-${pageId}` }, this.state));
    }
    return page;
  }
});

export default App;
