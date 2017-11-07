import React, { Component } from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';
import AboutHero from 'app/components/about-hero';

class About extends Component {
  render() {
    const { page, className, loaded, isMobile, footer, studios, currentPage, fixedHeight, documentScrollPosition, viewportDimensions, popup, modal } = this.props;
    const classes = classnames('page-about', className);

    return (
      <article className={classes}>

        <div className="home-pinned-header-wrapper">
          <div className="home-pinned-header-inner">
            <ScrollWrapper
              component={<AboutHero loaded={loaded} modal={modal} isMobile={isMobile} fixedHeight={fixedHeight} />}
              documentScrollPosition={documentScrollPosition}
              viewportDimensions={viewportDimensions}
              requireScreenPosition={true}
              className="scroll-wrapper-work-hero"
            />
          </div>
        </div>

        <div className="home-main-content-wrapper">



        </div>

      </article>
    );
  }
}

export default About;
