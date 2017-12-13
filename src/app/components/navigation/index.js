import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import classnames from 'classnames';
import Scroll from 'react-scroll';
import Flux from 'app/flux';
import Nulls from 'app/flux/nulls';
import Track from 'app/adaptors/server/track';
import SVG from 'app/components/svg';
import FramesUstwoLogo from 'app/components/frames-ustwo-logo';
import MenuIconRingSequence from 'app/components/menu-icon-ring-sequence';
import SVGSequence from 'app/components/svg-sequence';
import kebabCase from 'lodash/string/kebabCase';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      navHeight: 0,
      paused: true,
      capabilityPages: ['discovery-strategy', 'design-build', 'launch-scale', 'change-and-transform']
    }
  }

  componentDidMount() {
    this.setState({
      active: true,
      navHeight: this.navigation.getBoundingClientRect().height
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded != this.props.loaded) {
      this.setState({ paused: false });

      setTimeout(() => {
        this.setState({ paused: true });
      }, 1000);
    }
  }

  toggleMenu() {
    const { modal } = this.props;

    if (modal === 'menu') {
      Flux.closeModal();
    } else {
      Flux.showNavOverlay();
    }
  }

  subPageBack(event) {
    event.preventDefault();

    let navigateTo;
    switch(this.props.page) {
      case 'post':
        navigateTo = '/blog';
        break;
      case 'discovery-strategy':
      case 'design-build':
      case 'launch-scale':
      case 'change-and-transform':
        navigateTo = '/about-us';
        break;
      case 'case-study':
      case 'auto':
        navigateTo = '/work';
        break;
      case 'event':
        navigateTo = '/events';
        break;
      case 'humanisingautonomy':
        navigateTo = '/auto';
        break;
      default:
        navigateTo = '/';
    }

    Flux.navigate(navigateTo);
  }

  renderBackButton() {
    const { page } = this.props;
    const { capabilityPages, workPages } = this.state;
    const subPage = page === 'case-study' || page === 'post' || page === 'humanisingautonomy' || capabilityPages.includes(page);

    let linkText;
    if (page === 'case-study') {
      linkText = 'Work';
    } else if (capabilityPages.includes(page)) {
      linkText = 'About Us'
    } else if (page === 'humanisingautonomy') {
      linkText = 'Auto & Mobility';
    } else if (page === 'post') {
      linkText = 'Blog';
    } else {
      linkText = 'Back';
    }

    if (subPage) {
      return (
        <button onClick={this.subPageBack.bind(this)}>{linkText}</button>
      );
    }
    return;
  }


  mouseEnter() {
    this.setState({ paused: false });
  }

  mouseLeave() {
    this.setState({ paused: true });
  }

  onClickLogo(event) {
    event.preventDefault();
    Flux.navigate('/');
  }

  render() {
    const { section, page, customClass, documentScrollPosition, venturesPosition, testimonialsPosition, popup, modal, viewportDimensions, caseStudy } = this.props;
    const { active, paused, navHeight, capabilityPages } = this.state;

    const venturesActive = venturesPosition && documentScrollPosition > venturesPosition.from - (navHeight * .5) && documentScrollPosition < venturesPosition.to - (navHeight * .5);
    const testimonialsActive = !isEmpty(testimonialsPosition) && documentScrollPosition > testimonialsPosition.from - (navHeight * 0.5) && documentScrollPosition < testimonialsPosition.to - (navHeight * 0.5);
    const footerActive = documentScrollPosition > 4000 - (693 + 414);
    const homePage = section === 'home';
    const heroPage = section === 'home' || section === 'about-us' || section === 'work' || section === 'join-us' || section === 'events' || section === 'blog' || section === 'auto' || section === 'contact-us';
    const subPage = page === 'post' || page === 'event' || capabilityPages.includes(page) || page === 'case-study' || page === 'auto' || page === 'humanisingautonomy';
    const blogEvent = (section === 'blog' || section === 'events') && !subPage;
    const scrolled = documentScrollPosition > 0;
    const scrolledAfter100 = documentScrollPosition > viewportDimensions.height - (navHeight * 0.5);
    const caseStudyName = caseStudy ? kebabCase(caseStudy.name) : null

    const navClasses = classnames('navigation', customClass, section, page, caseStudyName, {
      sticky: modal === null && scrolledAfter100 && homePage,
      pageControls: subPage,
      scrolled: scrolled,
      subPage: subPage,
      overHero: !scrolledAfter100 && heroPage && !subPage || !scrolledAfter100 && heroPage,
      default: capabilityPages.includes(page),
      invert: venturesActive && homePage && scrolledAfter100 && !modal || testimonialsActive,
      menuOpen: modal,
      active: active && section === 'home'
    });

    let color;
    switch(section) {
      case 'home':
        color = ['#16D6D9', '#96CC29']; // $mare, $jeezz
        break;
      case 'work':
        color = ['#6114CC', '#FA7D78']; // $rain, $softPassion
        break;
      case 'blog':
        color = ['#009CF3', '#16D6D9']; // $blu, $mare
        break;
      case 'about-us':
        color = ['#ED0082', '#FA7D78']; // $piglet, $softPassion
        break;
      case 'join-us':
        color = ['#FFBF02', '#FA7D78']; // $honey, $softPassion
        break;
      case 'contact-us':
        color = ['#14C04D', '#F5E664']; // $pot, $softHoney
        break;
      case 'notfound':
        color = ['#6114CC', '#FA7D78']; // $rain, $softPassion
        break;
    }

    if (caseStudy && caseStudy.name === 'ustwo Auto' || section === 'auto') {
      color = ['#f8e467', '#ffbf00'];
    }

    return (
      <nav className={navClasses} ref={(ref) => this.navigation = ref}>
        <div className="menu-no-js">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/work">Work</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/join-us">Join us</a></li>
          </ul>
        </div>
        <div className="navigation-subpage-nav">
          {this.renderBackButton()}
        </div>
        <div className="navigation-buttons">
          <button
            className="navigation-logo"
            onClick={this.onClickLogo.bind(this)}
          >
            <SVG title="ustwo" spritemapID="ustwologo" />
          </button>
          <button
            className="navigation-toggle"
            onClick={this.toggleMenu.bind(this)}
            onMouseOver={this.mouseEnter.bind(this)}
            onMouseOut={this.mouseLeave.bind(this)}
          >
            <div className="navigation-toggle-main"></div>
            <SVGSequence fps={25} paused={paused} name="icon-ring" color={color} />
          </button>
        </div>
      </nav>
    );
  }
};

export default Navigation;
