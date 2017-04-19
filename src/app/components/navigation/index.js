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

class Navigation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      paused: true
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

  onClickLogo(event) {
    event.preventDefault();
    Flux.navigate('/');
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
        Flux.visitedWorkCapabilities(false);
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

  mouseEnter() {
    this.setState({ paused: false });
  }

  mouseLeave() {
    this.setState({ paused: true });
  }

  render() {
    const { section, page, takeover, customClass, documentScrollPosition, venturesPosition, popup, modal, viewportDimensions } = this.props;

    const capability = ['discovery-strategy', 'design-build', 'launch-scale'];
    const venturesActive = venturesPosition && (documentScrollPosition - viewportDimensions.height > venturesPosition.from) && (documentScrollPosition - viewportDimensions.height < venturesPosition.to);
    const homePage = section === 'home';
    const heroPage = section === 'work' || section === 'join-us' || section === 'events' || section === 'blog';
    const subPage = page === 'post' || page === 'case-study' || page === 'event' || capability.includes(page);
    const blogEvent = (section === 'blog' || section === 'events') && !subPage;
    const scrolled = documentScrollPosition > 0;
    const scrolledBefore100 = documentScrollPosition < viewportDimensions.height - (this.state.height * 0.5);

    const navClasses = classnames('navigation', customClass, section, page, {
      takeover: takeover,
      notSticky: modal === null && scrolledBefore100 && homePage,
      menuOpen: modal === 'menu',
      invert: venturesActive && homePage || capability.includes(page),
      overHero: scrolledBefore100 && heroPage && !subPage,
      pageControls: subPage,
      scrolled: scrolled,
      subPage: subPage
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

    const subPageText = capability.includes(page) ? 'Work' : 'Back';

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
        <div className="navigation-subpage-nav">
          <button onClick={this.subPageBack.bind(this)}>{subPageText}</button>
        </div>
        <button
          className="navigation-button"
          onClick={this.toggleMenu.bind(this)}
          onMouseOver={this.mouseEnter.bind(this)}
          onMouseOut={this.mouseLeave.bind(this)}
        >
          <div className="navigation-logo">
            <SVG title="ustwo logo" spritemapID="ustwologo" />
          </div>
          <div className="navigation-toggle">
            <div className="navigation-toggle-main"></div>
            <SVGSequence fps={25} paused={this.state.paused} name="icon-ring" color={color} />
          </div>
        </button>
      </nav>
    );
  }
};

export default Navigation;
