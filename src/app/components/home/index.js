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
      venturesPosition: {},
      venturesActive: false
    }
  }

  // We need to find out viewportDimensions and if ventures is active (therefore know where it is)
  // Update all of it if we resize
  getVenturesPosition() {
    const venturesHeight = this.venturesWrapper.getBoundingClientRect().height;
    const venturesPositionFromTop = this.venturesWrapper.offsetTop - (this.props.viewportDimensions.height * 0.5);

    const venturesPosition = {
      from: venturesPositionFromTop,
      to: venturesPositionFromTop + venturesHeight
    }
    this.setState({ venturesPosition });
    Flux.venturesPosition(venturesPosition);
  }

  componentDidMount() {
    this.getVenturesPosition();

    // Make sure that if the viewport is resized we update accordingly othewise scrolls/mousePositions will be out of sync
    this.homeContent.addEventListener('resize', () => {
      this.getVenturesPosition();
    });
  }

  componentWillUnmount() {
    this.homeContent.removeEventListener('resize', () => {
      this.getVenturesPosition();
    });
  }

  render() {
    const { page, documentScrollPosition, viewportDimensions, scrolling, appLoading, popup, isMobile } = this.props;
    const { venturesPosition } = this.state;

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
      <article className={classes} ref={(ref) => this.homeContent = ref}>

        <Link to="homeTextBlock" smooth={true} duration={1000} className="home-intro-link">
          <ScrollWrapper
            component={<HomeIntro scrolling={scrolling} appLoaded={!appLoading} isMobile={isMobile} popup={popup} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            requireScreenPosition={true}
            className="scroll-wrapper-home-intro"
          />
        </Link>

        <Element name="homeTextBlock" className="home-welcome-wrapper">
          <ScrollWrapper
            component={<HomeTextBlock content={textBlockIntro} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            className="scroll-wrapper-home-welcome-message"
          />
        </Element>

        <ScrollWrapper
          component={<HomeCarousel carouselItems={dataProducts} isMobile={isMobile} inView={!venturesActive} />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          className="scroll-wrapper-home-carousel-products"
        />

        <div className="home-ventures-wrapper" ref={(ref) => this.venturesWrapper = ref }>

          <div className="home-ventures-wrapper-bg"></div>

          <ScrollWrapper
            component={<HomeTextBlock content={textBlockMore} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            className="scroll-wrapper-home-more-message"
          />

          <ScrollWrapper
            component={<HomeCarousel carouselItems={dataVentures} isMobile={isMobile} darkStyle={true} inView={venturesActive} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            className="scroll-wrapper-home-carousel-ventures"
          />

        </div>

        <ScrollWrapper
          component={<HomeTextBlock content={textBlockSmorgasbord} />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          className="scroll-wrapper-home-smorgasbord-message"
        />

        <ScrollWrapper
          component={<HomeSmorgasbord data={page.featured_content} />}
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
  imageURL: "/images/home/ford-gopark.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Android wear",
  category: "Client Work",
  imageURL: "/images/home/android-wear.jpg",
  videoURL: "/images/home/android-wear.mp4",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Foursquare",
  category: "Client Work",
  imageURL: "/images/home/foursquare.jpg",
  videoURL: "/images/home/foursquare.mp4",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Adidas Go",
  category: "Client Work",
  imageURL: "/images/home/adidas-go.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Google Cardboard ",
  category: "Client Work",
  imageURL: "/images/home/google-cardboard.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Harvey Nichols",
  category: "Client Work",
  imageURL: "/images/home/harvey-nichols.jpg",
  videoURL: "/images/home/harvey-nichols.mp4",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Sky Kids",
  category: "Client Work",
  imageURL: "/images/home/sky-kids.jpg",
  videoURL: "/images/home/sky-kids.mp4",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "NBC Sprout",
  category: "Client Work",
  imageURL: "/images/home/nbc-sprout.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
}];

const dataVentures = [{
  title: "ustwo Games",
  category: "Venture",
  imageURL: "/images/home/ustwo-games.jpg",
  videoURL: "/images/home/monument-valley.mp4",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Dice",
  category: "Venture",
  imageURL: "/images/home/dice.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Moodnotes",
  category: "Venture",
  imageURL: "/images/home/moodnotes.jpg",
  videoURL: "/images/home/moodnotes.mp4",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Wayfindr",
  category: "Venture",
  imageURL: "/images/home/wayfindr.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Pause",
  category: "Venture",
  imageURL: "/images/home/pause.jpg",
  videoURL: "/images/home/pause.mp4",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
},{
  title: "Watch This",
  category: "Venture",
  imageURL: "/images/home/watch-this.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
}];
