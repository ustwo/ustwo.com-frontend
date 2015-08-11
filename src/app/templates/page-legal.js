'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';

export default class PageLegal extends React.Component {
  render() {
    const pageData = this.props.page;
    return (
      <article className="page-legal">

        <div className="hero-image" style={{backgroundImage: "url(/images/photo.jpg)"}}>
          <img className="image" src="/images/photo.jpg" />
        </div>

        <div className="content-container">

          <h2>Legal</h2>

          <p>ustwo studio ltd. Registered No. 05286528. Registered in England & Wales.</p>
          <p>Registered office:</p>
          <p>2 AC Court, High Street, Thames Ditton, Surrey, KT7 0SR</p>
          <p>VAT number: 853 3847 04</p>

        </div>

      </article>
    );
  }
}
