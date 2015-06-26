'use strict'

import React from 'react';
import '../node_modules/whatwg-fetch/fetch.js';
// TODO: see if there's a better way to get fonts in
import './localfont.js';

import Navigation from './modules/navigation.jsx';
import PageHome from './templates/page-home.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        pages: []
      }
    }
  }
  componentDidMount() {
    // This is currently broken in IE11: https://github.com/github/fetch/issues/114
    fetch(this.props.url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({data: json});
    }).catch(function(ex) {
      console.warn('App data JSON parsing failed:', ex);
    });
  }
  render() {
    const renderData = this.state.data;
    return (
      <div>
        <Navigation data={renderData.pages} customClass="transparent-white" />
        <PageHome/>
      </div>
    );
  }
};

React.render(
  <App url="data/gulpdata.json" />,
  document.getElementById('pageContent')
);
