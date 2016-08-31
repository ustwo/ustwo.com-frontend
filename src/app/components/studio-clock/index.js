'use strict';

import React from 'react';
import moment from 'moment';
import SVG from 'app/components/svg';

const StudioClock = React.createClass({
  getInitialState: function(){
    return {
      clockInView: false
    }
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll: function(event) {
    var elements = document.getElementsByClassName('clock');

    for(var i = 0; i != elements.length; i++) {
      if(elements[i].getBoundingClientRect().top <= window.innerHeight*0.75 && elements[i].getBoundingClientRect().top > 0) {
        this.setState({
          clockInView: true
        });
      }
    }
  },
  renderMoon: function(date) {
    var showMoon = this.props.showMoon;
    if(showMoon) return <SVG className="moon" spritemapID="moon" />
  },
  render() {
    var colour = this.props.colour;
    var date = this.props.date;
    if(this.props.offset) {
      date = date.utcOffset(this.props.offset);
    }
    var millis = date.milliseconds();
    var second = date.seconds() * 6 + millis * (6 / 1000);
    var minute = date.minutes() * 6 + second / 60;
    var hour = ((date.hours() % 12) / 12) * 360 + 90 + minute / 12;

    return <div className={this.state.clockInView ? "clock" : "clock set-to-twelve"}>
        <div className="minute" style={{"transform": "rotate(" + minute + "deg)"}} />
        <div className="hour" style={{"transform": "rotate(" + hour + "deg)", background: colour}} />
        {this.renderMoon(date)}
    </div>
  }
});

export default StudioClock;
