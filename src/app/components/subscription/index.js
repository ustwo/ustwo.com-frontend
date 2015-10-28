'use strict';

import React from 'react';

import SVG from '../svg';

export default class Subscription extends React.Component {
  render() {
    const labelText = "Enter your email...";
    return (
      <div className="subscription">
        <SVG className="icon" spritemapID="subscriptionIcon" />
        <h2>ustwo News</h2>
        <p>Give us your email and we'll keep you in the loop with our latest projects and thoughts</p>
        <form action="//ustwo.us10.list-manage.com/subscribe/post?u=7f1269c0305abed7c91a24b97&amp;id=a4ba15109f" method="POST">
          <label htmlFor="subscription-email" className="label">{labelText}</label>
          <input name="EMAIL" id="subscription-email" className="email" placeholder={labelText} required={true} />
          <div style={{ position: "absolute", left: -5000 }}>
            <input type="text" name="b_7f1269c0305abed7c91a24b97_e6835a8563" tabIndex="-1" value="" />
          </div>
          <button className="submit" type="submit"><span className="submit-text">Subscribe</span></button>
        </form>
      </div>
    );
  }
}
