'use strict';

import React from 'react';
import classnames from 'classnames';
import SVG from 'app/components/svg';

const Subscription = React.createClass({
  getInitialState() {
    return {
      logoInView: false
    }
  },
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll(event) {
    const container = document.getElementsByClassName('icon');

    if(container[0].getBoundingClientRect().top <= window.innerHeight*0.75 && container[0].getBoundingClientRect().top > 0) {
      this.setState({
        logoInView: true
      });
    }
  },
  render() {
    const classes = classnames('icon', {
      animate: this.state.logoInView
    });
    const labelText = "Enter your email...";
    return <div className="subscription">
      <div className={classes}></div>
      <h2>ustwo News</h2>
      <p>Give us your email and we’ll keep you in the loop with our latest projects and thoughts</p>
      <form
        method="POST"
        action="//ustwo.us10.list-manage.com/subscribe/post?u=7f1269c0305abed7c91a24b97&amp;id=a4ba15109f"
      >
        <label htmlFor="subscription-email" className="label">
          {labelText}
        </label>
        <input
          name="EMAIL"
          id="subscription-email"
          className="email"
          placeholder={labelText}
          required={true}
        />
        <div style={{ position: "absolute", left: -5000 }}>
          <input
            type="text"
            name="b_7f1269c0305abed7c91a24b97_e6835a8563"
            tabIndex="-1"
            value=""
          />
        </div>
        <button className="submit" type="submit">
          <span className="submit-text">Subscribe</span>
        </button>
      </form>
    </div>;
  }
});

export default Subscription;
