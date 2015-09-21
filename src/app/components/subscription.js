'use strict';

import React from 'react';

export default class Subscription extends React.Component {
  render() {
    const labelText = "Enter your email...";
    return (
      <div className="subscription">
        <h2>ustwo News</h2>
        <p>Give us your email and we'll keep you in the loop with our latest projects and thoughts.</p>
        <form action="//ustwo.us10.list-manage.com/subscribe/post?u=7f1269c0305abed7c91a24b97&amp;id=e6835a8563" method="POST" target="_blank">
          <label htmlFor="subscription-email">{labelText}</label>
          <input name="EMAIL" id="subscription-email" placeholder={labelText} required={true} />
          <div style={{ position: "absolute", left: -5000 }}>
            <input type="text" name="b_7f1269c0305abed7c91a24b97_e6835a8563" tabIndex="-1" value="" />
          </div>
          <button type="submit">Subscribe</button>
        </form>
      </div>
    );
  }
}
