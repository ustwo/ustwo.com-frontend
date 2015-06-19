'use strict';

import React from 'react';

import BoldHeader from '../components/bold-header.jsx';

const PageHome = React.createClass({
  displayName: 'PageHome',
  render() {
    return (
      <article className="page__home">
        <section className="page__section u-bg-rain">
          <BoldHeader colour="white">We're a digital product studio</BoldHeader>
        </section>
      </article>
    );
  }
});

export default PageHome;
