import React from 'react';
import window from 'app/adaptors/server/window';
import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';

function AutoBook({ page, documentScrollPosition, viewportDimensions, footer, studios, currentPage, isMobile, fixedHeight, scrollProgress }) {

  let styles;
  if (documentScrollPosition > window.innerHeight + 100) {
    styles = { position: `relative` }
  }

  return (
    <div className="page-auto page-auto-book">
      <div className="home-pinned-header-wrapper">
        <div className="home-pinned-header-inner" style={styles}>
          <ScrollWrapper
            component={
              <Hero
                title={autoBookData.title}
                subheading={autoBookData.subtitle}
                transitionImage={true}
                showDownIndicator={true}
                eventLabel=''
                fixedHeight={fixedHeight}
                isMobile={isMobile}
                scrollProgress={scrollProgress}
                heroImage={true}
              />
            }
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
          />
        </div>
      </div>

      <div className="home-main-content-wrapper">

        BOOK CONTENT

      </div>
    </div>

  )
}

export default AutoBook;

const autoBookData = {
  title: 'Auto Book',
  subtitle: 'Humanising Autonomy'
}
