import React, { Component } from 'react';
import classnames from 'classnames';
import Video from 'app/components/video';
import ScrollWrapper from 'app/components/scroll-wrapper';

import HomeIntro from 'app/components/home-intro';
import HomeWelcomeMessage from 'app/components/home-welcome-message';
import HomeCarousel from 'app/components/home-carousel';
import HomeMoreMessage from 'app/components/home-more-message';

function getViewportDimensions(component) {
  return (e) => {
    let viewportDimensions = {
      width: e.target.visualViewport.clientWidth,
      height: e.target.visualViewport.clientHeight
    };
    component.setState({ viewportDimensions });
  }
}

function getDocumentScrollPosition(component) {
  return (e) => {
    component.setState({ documentScrollPosition: e.target.scrollingElement.scrollTop });
  }
}

class PageHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      documentScrollPosition: 0,
      viewportDimensions: {}
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', getDocumentScrollPosition(this));
    window.addEventListener('resize', getViewportDimensions(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', getDocumentScrollPosition(this));
    window.removeEventListener('resize', getViewportDimensions(this));
  }

  render() {
    const classes = classnames('page-home', this.props.className);

    return (
      <article className={classes} id="scroll-container">

        <ScrollWrapper
          component={<HomeIntro />}
          documentScrollPosition={this.state.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          getMousePosition={true}
        />

        <ScrollWrapper
          component={<HomeWelcomeMessage />}
          documentScrollPosition={this.state.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
        />

        <ScrollWrapper
          component={<HomeCarousel carouselItems={dataProducts} />}
          documentScrollPosition={this.state.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          getMousePosition={true}
        />

        <div className="home-ventures-wrapper">

          <ScrollWrapper
            component={<HomeMoreMessage />}
            documentScrollPosition={this.state.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
          />

          <ScrollWrapper
            component={<HomeCarousel carouselItems={dataVentures} />}
            documentScrollPosition={this.state.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            getMousePosition={true}
          />

        </div>

      </article>
    );
  }
};

export default PageHome;

const dataProducts = [{
  title: "Sky Kids",
  category: "Client Work",
  imageURL: ""
},{
  title: "Harvey Nichols",
  category: "Client Work",
  imageURL: ""
},{
  title: "Foursquare",
  category: "Client Work",
  imageURL: ""
},{
  title: "Ford GoPark",
  category: "Client Work",
  imageURL: ""
}];

const dataVentures = [{
  title: "ustwo Games",
  category: "ustwo Venture",
  imageURL: ""
},{
  title: "Dice",
  category: "ustwo Venture",
  imageURL: ""
},{
  title: "Pause",
  category: "ustwo Venture",
  imageURL: ""
},{
  title: "Moodnotes",
  category: "ustwo Venture",
  imageURL: ""
}];
