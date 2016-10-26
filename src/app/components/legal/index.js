'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import { get } from 'lodash';

import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';

import Rimage from 'app/components/rimage';

const PageLegal = React.createClass({
  mixins: [getScrollTrackerMixin('legal')],
  render() {
    const pageData = this.props.page;
    const sizes = { hardcoded: { url: '/images/photo.jpg' }};

    return <article className="page-legal">
      <Rimage className='hero-image' sizes={sizes} wrap='div' />
      <div className="content-container">
        <h2>Legal</h2>
        <p>Ustwo Fampany Limited. Registered No. 05286528. Registered in England & Wales.</p>
        <p>Registered office:</p>
        <p>Unit G.01, Tea Building, 56 Shoreditch High Street, London, E1 6JJ</p>
        <p>VAT number: 227 2497 00</p>
      </div>
    </article>;
  }
});

export default PageLegal;
