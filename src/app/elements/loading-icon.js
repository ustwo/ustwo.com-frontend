import React from 'react';
import get from 'lodash/object/get';

export default class LoadingIcon extends React.Component {
  render() {
    return (
      <div className="loading-icon">
        <div className="wrapper">
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
        </div>
      </div>
    );
  }
}
