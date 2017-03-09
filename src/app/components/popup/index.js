import React, { Component } from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';

import CloseButton from 'app/components/close-button';

function renderBackgroundImages(images, viewportSize) {

  // TODO: Refactor this
  // let columns = 2;
  // let rows = 3;
  // if (viewport > 500) {
  //   columns = 3;
  // } else if (viewport > 768) {
  //   columns = 4;
  // } else if (viewport > 1024) {
  //   columns = 5;
  // }
  // const totalImages = images.length();

  const renderImages = images.map((image, i) => {
    return (
      <div className="popup-image">
        <img src={`/images/home/popups/${image}`} />
      </div>
    );
  });

  return (
    <div className="popup-grid">
      {renderImages}
    </div>
  );
}

class Popup extends Component {

  constructor(props) {
    super(props);

    this.state = { viewportSize: 0 }
  }

  onClick() {
    Flux.closePopup();
  }

  componentDidMount() {
    this.setState({ viewportSize: window.innerWidth });
  }

  render() {
    const { className, children, type } = this.props;
    const classes = classnames('popup', `popup-${type}`, className.replace('shown',''));

    const { text, images, invert } = popupData[type];

    return (
      <div className={classes} onClick={this.onClick}>
        <div className="popup-content">
          <CloseButton
            onClose={this.onClick}
            autoAnim={10}
            style={{ fill: invert ? 'white' : 'black' }}
          />
          <p>{text}</p>
        </div>
        {renderBackgroundImages(images, this.state.viewportSize)}
      </div>
    );
  }
}

export default Popup;

const popupData = {
  products: {
    text: 'We’ll help you find the best, most direct and most rewarding way to build truly loved digital products and services.',
    images: [
      'popup-products-1.jpg',
      'popup-products-2.jpg',
      'popup-products-3.jpg',
      'popup-products-4.jpg',
    ]
  },
  services: {
    text: 'We invest in understanding users and in ways of working that get the most from you and your team, while delivering impact for your business.',
    images: [
      'popup-services-1.jpg',
      'popup-services-2.jpg',
      'popup-services-4.jpg',
      'popup-services-3.jpg',
    ]
  },
  brands: {
    text: 'We work as partners with the biggest, smartest brands to create defining digital products, services and businesses.',
    images: [
      'logo-adidas.svg',
      'logo-google.svg',
      'logo-bmw-group.svg',
      'logo-hasbro.png',
      'logo-ikea.svg',
      'logo-nbc.svg',
      'logo-ford.svg',
      'logo-foursquare.svg',
      'logo-sony.svg',
      'logo-sky.svg',
      'logo-coop.svg',
      'logo-android.svg',
      'logo-harvey-nichols.svg',
      'logo-harvey-nichols.svg',
    ]
  },
  invest: {
    text: 'We’re on a mission to help partners launch digital products and services that have a meaningful impact on the world.',
    images: [
      'logo-amaliah.svg',
      'logo-tribe.svg',
      'logo-hoop.svg',
      'logo-tray.png',
      'logo-curiscope.png',
      'logo-marvel.svg',
      'logo-everpress.svg',
      'logo-mayku.svg',
    ],
    invert: true
  },
  ventures: {
    text: 'We partner with the world’s leading experts and entrepreneurs, offering our expertise, technology or investment to create great new companies.',
    images: [
      'logo-amaliah.svg',
      'logo-tribe.svg',
      'logo-hoop.svg',
      'logo-tray.png',
      'logo-curiscope.png',
      'logo-marvel.svg',
      'logo-everpress.svg',
      'logo-marku.svg',
    ],
    invert: true
  },
  difference: {
    text: 'Our work has set the standards, won the awards and most important of all been used by tens of millions of people.',
    images: [
      'popup-difference-1.png',
    ],
    invert: true
  },
  together: {
    text: 'Our work has set the standards, won the awards and most important of all been used by tens of millions of people.',
    images: [
      'together-london.jpg',
      'together-newyork.jpg',
      'together-sydney.jpg',
      'together-malmo.jpg'
    ]
  },
  collective: {
    text: 'Our work has set the standards, won the awards and most important of all been used by tens of millions of people.',
    images: [
      'popup-difference-1.png',
    ]
  },
  genius: {
    text: 'Our work has set the standards, won the awards and most important of all been used by tens of millions of people.',
    images: [
      'popup-difference-1.png',
    ]
  }
}
