import React, { Component } from 'react';
import classnames from 'classnames';

import CloseButton from 'app/components/close-button';

import Flux from 'app/flux';

class Popup extends Component {

  onClick() {
    Flux.closePopup();
  }

  render() {
    const { className, children, type } = this.props;
    const classes = classnames('popup', className.replace('shown',''));

    let image, text;
    let invert = false;
    switch(type) {
      case 'products':
        image = 'popup-placeholder-products.png';
        text = 'We’ll help you find the best, most direct and most rewarding way to build truly loved digital products and services.';
        break;
      case 'services':
        image = 'popup-placeholder-services.png';
        text = 'We invest in understanding users and in ways of working that get the most from you and your team, while delivering impact for your business.';
        break;
      case 'brands':
        image = 'popup-placeholder-logos.png';
        text = 'We work as partners with the biggest, smartest brands to create defining digital products, services and businesses.';
        break;
      case 'invest':
        image = 'popup-placeholder-invest.png';
        text = 'We’re on a mission to help partners launch digital products and services that have a meaningful impact on the world.';
        invert = true;
        break;
      case 'ventures':
        image = 'popup-placeholder-ventures.png';
        text = 'We partner with the world’s leading experts and entrepreneurs, offering our expertise, technology or investment to create great new companies.';
        invert = true;
        break;
      case 'difference':
        image = 'popup-placeholder-difference.png';
        text = 'Our work has set the standards, won the awards and most important of all been used by tens of millions of people.';
        invert = true;
    }

    return (
      <div className={classes} onClick={this.onClick}>
        <CloseButton
          onClose={this.onClick}
          autoAnim={10}
          style={{ fill: invert ? 'white' : 'black' }}
        />
        <img src={`/images/temp/${image}`} />
        <p>{text}</p>
      </div>
    );
  }
}

export default Popup;
