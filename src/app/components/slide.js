'use strict';

import React from 'react';
import get from 'lodash/object/get';
import Flux from '../flux';

export default class Slide extends React.Component {
  render() {
    return (
      <div className="slide">
        <div className="card feature">
          <h2>A Place that makes you smile</h2>
          <p>Croque monsieur bocconcini say cheese. When the cheese comes out everybodys happy ricotta smelly cheese.</p>
        </div>
        <div className="card image" style={{backgroundImage: "url('/images/photo.jpg')"}}></div>
      </div>
    );
  }
}
