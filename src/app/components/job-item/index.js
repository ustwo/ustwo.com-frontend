'use strict';

import React from 'react';
import classnames from 'classnames';
import ellipsize from 'ellipsize';
import { get } from 'lodash';

import SVG from 'app/components/svg';

const JobItem = React.createClass({
  componentDidUpdate() {
    const { props, open } = this.props;
    const el = React.findDOMNode(this);
    const title = React.findDOMNode(this.refs.title);
    const description = React.findDOMNode(this.refs.description);
    let newHeight;
    if (open && this.getLoadedState()) {
      newHeight = title.clientHeight + description.clientHeight;
    } else {
      newHeight = title.clientHeight;
    }
    el.style.height = `${newHeight}px`;
  },
  onClick() {
    this.props.onClick && this.props.onClick();
  },
  getLoadedState() {
    return get(this.props.job, 'description');
  },
  renderLocation() {
    const { colour, job } = this.props;
    const responseCity = get(job, 'location.city');
    const responseRegion = get(job, 'location.region');
    let location;
    if (responseRegion === 'London') {
      location = 'London';
    } else if (responseRegion === 'New York') {
      location = 'New York';
    } else if (responseCity === 'Malmo') {
      location = 'Malmö';
    } else {
      location = responseCity;
    }
    return <div className="location" style={{ color: colour }}>
      {location}
    </div>;
  },
  renderStatus() {
    const { job, open, colour } = this.props;
    const loaded = this.getLoadedState();
    return <div className="status">
      <div className="status-text">
        {open && loaded ? 'Hide info' : 'More info'}
      </div>
      <div className="status-icon">
        <div className="horiz" style={{ backgroundColor: colour }}></div>
        <div className="vert" style={{ backgroundColor: colour }}></div>
      </div>
    </div>;
  },
  render() {
    const { job, open, colour } = this.props;
    const classes = classnames('job-item', {
      open: open,
      loading: open && !this.getLoadedState()
    });
    return <li className={classes} style={{ color: this.props.colour }}>
      <h4 ref="title" className="title" onClick={this.onClick}>
        <div className="title-text">{get(job, 'title')}</div>
        {this.renderLocation()}
        {this.renderStatus()}
      </h4>
      <div ref="description" className="job-description">
        <p className="description-text">
          {ellipsize(get(job, 'description'), 400)}
        </p>
        <a
          className="link"
          href={get(job, 'url')}
          style={{ borderBottomColor: colour }}
        >
          Read full description
        </a>
      </div>
    </li>;
  }
});

export default JobItem;
