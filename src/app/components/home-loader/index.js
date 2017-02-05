import React, { Component } from 'react';
import classnames from 'classnames';
import SVG from 'app/components/svg';
import UstwoLogoSequenceCutout from 'app/components/ustwo-logo-sequence-cutout';

class HomeLoader extends Component {

  constructor(props) {
    super(props);

    this.state = { show: true }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded) {
      setTimeout(() => {
        this.setState({ show: false });
      }.bind(this), 1000);
    }
  }

  render() {
    let content;
    if (this.state.show) {
      content = (
        <div className="home-loader">
          <div className="home-intro-logo">
            <UstwoLogoSequenceCutout autoAnim={5} loop={true} />
          </div>
        </div>
      )
    } else {
      content = <div />
    }
    return content;
  }

}

export default HomeLoader;
