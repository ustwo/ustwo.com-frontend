import React, { Component } from 'react';
import classnames from 'classnames';
import Scroll, { Link, Element } from 'react-scroll'; // Animate and scroll to location in document
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';

import ScrollWrapper from 'app/components/scroll-wrapper';
import HomeIntro from 'app/components/home-intro';
import HomeTextBlock from 'app/components/home-text-block';
import HomeCarousel from 'app/components/home-carousel';
import HomeWelcomeMessage from 'app/components/home-welcome-message';
import HomeMoreMessage from 'app/components/home-more-message';
import HomeSmorgasbordMessage from 'app/components/home-smorgasbord-message';
import HomeSmorgasbord from 'app/components/home-smorgasbord';
import ContactBlock from 'app/components/contact-block';

class PageHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewportDimensions: {},
      venturesPosition: {},
      venturesActive: false,
      isMobile: null
    }
  }

  getViewportDimensions() {
    const viewportDimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.setState({
      viewportDimensions,
      isMobile: window.innerWidth < 600 ? true : false
    });
  }

  // We need to find out viewportDimensions and if ventures is active (therefore know where it is)
  // Update all of it if we resize
  getVenturesPosition() {
    const venturesHeight = this.venturesWrapper.getBoundingClientRect().height;
    const venturesPositionFromTop = this.venturesWrapper.offsetTop - (this.state.viewportDimensions.height * 0.5);

    const venturesPosition = {
      from: venturesPositionFromTop,
      to: venturesPositionFromTop + venturesHeight
    }
    this.setState({ venturesPosition });
    Flux.venturesPosition(venturesPosition);
  }

  componentWillMount() {
    this.getViewportDimensions();
  }

  componentDidMount() {
    this.getVenturesPosition();

    // Make sure that if the viewport is resized we update accordingly othewise scrolls/mousePositions will be out of sync
    window.addEventListener('resize', () => {
      this.getViewportDimensions();
      this.getVenturesPosition();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.getViewportDimensions();
      this.getVenturesPosition();
    });
  }

  render() {
    const { documentScrollPosition } = this.props;
    const { venturesPosition, isMobile } = this.state;

    const venturesActive = (documentScrollPosition > venturesPosition.from) && (documentScrollPosition < venturesPosition.to);

    const classes = classnames('page-home-content', this.props.className, {
      venturesActive: venturesActive // venturesActive shows or hides the dark background depending on when it falls in/out of view
    });

    // TODO: Do this nicer! Extract content. Perhaps when/if we integrate with CMS
    const textBlockIntro = {
      title: `Hi. We're ustwo.`,
      text: <HomeWelcomeMessage />
    }
    const textBlockMore = {
      title: `Still hungry?`,
      text: <HomeMoreMessage />
    }
    const textBlockSmorgasbord = {
      title: `More yes, more can, more wow`,
      text: <HomeSmorgasbordMessage />
    }

    return (
      <article className={classes}>

        <Link to="homeTextBlock" smooth={true} duration={1000} className="home-intro-link">
          <ScrollWrapper
            component={<HomeIntro scrolling={this.props.scrolling} appLoaded={this.props.appLoaded} isMobile={isMobile} />}
            documentScrollPosition={this.props.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            requireMousePosition={true}
            className="scroll-wrapper-home-intro"
          />
        </Link>

        <Element name="homeTextBlock" className="home-welcome-wrapper">
          <ScrollWrapper
            component={<HomeTextBlock content={textBlockIntro} />}
            documentScrollPosition={this.props.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            className="scroll-wrapper-home-welcome-message"
          />
        </Element>

        <ScrollWrapper
          component={<HomeCarousel carouselItems={dataProducts} isMobile={isMobile} inView={!venturesActive} />}
          documentScrollPosition={this.props.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          className="scroll-wrapper-home-carousel-products"
        />

        <div className="home-ventures-wrapper" ref={(ref) => this.venturesWrapper = ref }>

          <div className="home-ventures-wrapper-bg"></div>

          <ScrollWrapper
            component={<HomeTextBlock content={textBlockMore} />}
            documentScrollPosition={this.props.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            className="scroll-wrapper-home-more-message"
          />

          <ScrollWrapper
            component={<HomeCarousel carouselItems={dataVentures} isMobile={isMobile} darkStyle={true} inView={venturesActive} />}
            documentScrollPosition={this.props.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            className="scroll-wrapper-home-carousel-ventures"
          />

        </div>

        <ScrollWrapper
          component={<HomeTextBlock content={textBlockSmorgasbord} />}
          documentScrollPosition={this.props.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          className="scroll-wrapper-home-smorgasbord-message"
        />

        <ScrollWrapper
          component={<HomeSmorgasbord />}
          className="scroll-wrapper-home-smorgasbord"
        />

        <ContactBlock />

      </article>
    );
  }
};

export default PageHome;

// Hard coded data, TODO: Integrate with CMS
const dataProducts = [{
  title: "Ford GoPark",
  category: "Client Work",
  imageURL: "/images/home/ford-gopark.jpg"
},{
  title: "Android wear",
  category: "Client Work",
  imageURL: "/images/home/android-wear.jpg",
  videoURL: "/images/home/android-wear.mp4"
},{
  title: "Foursquare",
  category: "Client Work",
  imageURL: "/images/home/foursquare.jpg",
  videoURL: "/images/home/foursquare.mp4"
},{
  title: "Adidas Go",
  category: "Client Work",
  imageURL: "/images/home/adidas-go.jpg"
},{
  title: "Google Cardboard ",
  category: "Client Work",
  imageURL: "/images/home/google-cardboard.jpg"
},{
  title: "Harvey Nichols",
  category: "Client Work",
  imageURL: "/images/home/harvey-nichols.jpg",
  videoURL: "/images/home/harvey-nichols.mp4"
},{
  title: "Sky Kids",
  category: "Client Work",
  imageURL: "/images/home/sky-kids.jpg",
  videoURL: "/images/home/sky-kids.mp4"
},{
  title: "NBC Sprout",
  category: "Client Work",
  imageURL: "/images/home/nbc-sprout.jpg"
}];

const dataVentures = [{
  title: "ustwo Games",
  category: "Venture",
  imageURL: "/images/home/ustwo-games.jpg",
  videoURL: "/images/home/monument-valley.mp4"
},{
  title: "Dice",
  category: "Venture",
  imageURL: "/images/home/dice.jpg"
},{
  title: "Moodnotes",
  category: "Venture",
  imageURL: "/images/home/moodnotes.jpg",
  videoURL: "/images/home/moodnotes.mp4"
},{
  title: "Wayfindr",
  category: "Venture",
  imageURL: "/images/home/wayfindr.jpg"
},{
  title: "Pause",
  category: "Venture",
  imageURL: "/images/home/pause.jpg",
  videoURL: "/images/home/pause.mp4"
},{
  title: "Watch This",
  category: "Venture",
  imageURL: "/images/home/watch-this.jpg"
}];
