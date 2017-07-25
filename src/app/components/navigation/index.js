import React, { Component } from 'react';
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
      height: 0,
      paused: true,
      capabilityPages: ['discovery-strategy', 'design-build', 'launch-scale', 'ways-of-working'],
      workPages: ['case-study', 'ustwo-auto']
    }
  }

  componentDidMount() {
    this.setState({
      height: this.navigation.getBoundingClientRect().height
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
    const { viewportDimensions, documentScrollPosition, section, modal } = this.props;

    if (documentScrollPosition < viewportDimensions.height && section === 'home') {
      Scroll.animateScroll.scrollTo(viewportDimensions.height);
      Scroll.Events.scrollEvent.register('end', () => {
        if (modal === 'menu') {
          Flux.closeModal();
        } else {
          Flux.showNavOverlay();
        }
      });
    } else {
      if (modal === 'menu') {
        Flux.closeModal();
      } else {
        Flux.showNavOverlay();
      }
    }
  }

  subPageBack(event) {
    event.preventDefault();

    let navigateTo;
    switch(this.props.page) {
      case 'post':
        navigateTo = '/blog';
        break;
      case 'case-study':
      case 'discovery-strategy':
      case 'design-build':
      case 'launch-scale':
      case 'ways-of-working':
        navigateTo = '/work';
        break;
      case 'event':
        navigateTo = '/events';
        break;
      default:
        navigateTo = '/';
    }

    Flux.navigate(navigateTo);
  }

  renderBackButton() {
    const { page } = this.props;
    const { capabilityPages, workPages } = this.state;
    const workSubPage = capabilityPages.includes(page) || workPages.includes(page);
    const otherSubPage = page === 'post' || page === 'event';
    const subPageText = capabilityPages.includes(page) || page === 'case-study' ? 'Work' : 'Back';

    if (workSubPage || otherSubPage) {
      return (
        <div className="navigation-subpage-nav">
          <button onClick={this.subPageBack.bind(this)}>{workSubPage ? 'Work' : 'Back'}</button>
        </div>
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
    const { paused, height, capabilityPages, workPages } = this.state;

    const venturesActive = venturesPosition && documentScrollPosition > venturesPosition.from - (viewportDimensions.height * .5) && documentScrollPosition < venturesPosition.to - (viewportDimensions.height * .5);
    const testimonialsActive = testimonialsPosition && documentScrollPosition > testimonialsPosition.from && documentScrollPosition < testimonialsPosition.to;
    const homePage = section === 'home';
    const heroPage = section === 'work' || section === 'join-us' || section === 'events' || section === 'blog' || caseStudy || page === 'ustwo-auto';
    const subPage = page === 'post' || page === 'event' || capabilityPages.includes(page) || page === 'case-study';
    const blogEvent = (section === 'blog' || section === 'events') && !subPage;
    const scrolled = documentScrollPosition > 0;
    const scrolledAfter100 = documentScrollPosition > viewportDimensions.height - (height * 0.5);
    const caseStudyName = caseStudy ? kebabCase(caseStudy.name) : null

    const navClasses = classnames('navigation', customClass, section, page, caseStudyName, {
      notSticky: modal === null && !scrolledAfter100 && homePage,
      pageControls: subPage,
      scrolled: scrolled,
      subPage: subPage,
      notOverHero: scrolledAfter100 && heroPage && !subPage,
      default: capabilityPages.includes(page) || testimonialsActive,
      invert: subPage || !venturesActive && homePage && scrolledAfter100 && !modal || section === 'legal',
      menuOpen: modal
    });

    let color;
    switch(section) {
      case 'home':
        color = ['#16D6D9', '#96CC29'];
        break;
      case 'work':
        color = ['#6114CC', '#FA7D78'];
        break;
      case 'blog':
        color = ['#009CF3', '#16D6D9'];
        break;
      case 'events':
        color = ['#ED0082', '#FA7D78'];
        break;
      case 'join-us':
        color = ['#FFBF02', '#FA7D78'];
        break;
      case 'notfound':
        color = ['#6114CC', '#FA7D78'];
        break;
    }

    if (caseStudy && caseStudy.name === 'ustwo Auto') {
      color = ['#f8e467', '#ffbf00'];
    }

    return (
      <nav className={navClasses} ref={(ref) => this.navigation = ref}>
        <div className="menu-no-js">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/work">Work</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/join-us">Join us</a></li>
          </ul>
        </div>
        {this.renderBackButton()}
        <div className="navigation-buttons">
          <button
            className="navigation-logo"
            onClick={this.onClickLogo.bind(this)}
          >
            <SVG title="ustwo logo" spritemapID="ustwologo" />
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
