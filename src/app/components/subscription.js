'use strict';

import React from 'react';

export default class Subscription extends React.Component {
  render() {
    const labelText = "Enter your email...";
    return (
      <div className="subscription">
        <h2>ustwo News</h2>
        <p>Give us your email and we'll keep you in the loop with our latest projects and thoughts.</p>
        <form>
          <label htmlFor="subscription-email">{labelText}</label>
          <input name="email" id="subscription-email" placeholder={labelText} />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    );
  }
}
