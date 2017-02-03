import React, { Component } from 'react';
import classnames from 'classnames';
import SVG from 'app/components/svg';
import UstwoLogoSequence from 'app/components/ustwo-logo-sequence';

class HomeLoader extends Component {

  constructor(props) {
    super(props);

    this.state = { hide: false }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded) {
      setTimeout(() => {
        this.setState({ hide: true });
      }.bind(this), 1000);
    }
  }

  render() {
    let classes = classnames('home-loader', {
      hide: this.state.hide
    });

    return (
      <div className={classes}>
        <div className="home-intro-logo">
          <UstwoLogoSequence autoAnim={500} />
        </div>
      </div>
    );
  }

}

export default HomeLoader;
