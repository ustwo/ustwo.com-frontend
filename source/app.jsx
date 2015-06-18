'use strict'

import React from 'react';
import '../node_modules/whatwg-fetch/fetch.js';
// TODO: see if there's a better way to get fonts in
import './localfont.js';

import Navigation from './modules/navigation.jsx';

const App = React.createClass({
  displayName: 'App',
  getInitialState() {
    return {data: {pages: []}};
  },
  componentDidMount() {
    fetch(this.props.url)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({data: json});
    }).catch(function(ex) {
      console.warn('App data JSON parsing failed:', ex);
    });
  },
  render() {
    const renderData = this.state.data;
    return (
      <Navigation data={renderData.pages} />
    );
  }
});

export default App;

React.render(
  <App url="data/gulpdata.json" />,
  document.getElementById('pageContent')
);
