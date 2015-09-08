'use strict';

import React from 'react';
import classnames from 'classnames';
import ellipsize from 'ellipsize';
import get from 'lodash/object/get';

import SVG from '../elements/svg';

export default class JobItem extends React.Component {
  render() {
    const job = this.props.job;
    const classes = classnames('job-item', {
      open: this.props.open,
      loading: this.props.open && !this.getLoadedState()
    });
    return (
      <li className={classes}>
        <h4 ref='title' className="title" onClick={this.onClick}>
          <div className="title-text">{get(job, 'title')}</div>
          {this.renderLocation()}
          {this.renderStatus()}
        </h4>
        <div ref='description' className="job-description">
          <p className="description-text">{ellipsize(get(job, 'description'), 400)}</p>
          <a className="link" href={get(job, 'url')} style={{ borderBottomColor: this.props.colour }}>Read full description</a>
        </div>
      </li>
    );
  }
  getLoadedState = () => {
    return get(this.props.job, 'description');
  }
  renderLocation = () => {
    const props = this.props;
    return (
      <div className="location" style={{ color: props.colour }}>
        <SVG className='icon' spritemapID='locationpin' style={{ fill: props.colour }} />
        {get(props.job, 'location.city')}
      </div>
    );
  }
  renderStatus = () => {
    const loaded = this.getLoadedState();
    return (
      <div className="status">
        <div className="status-text">
          {this.props.open && loaded ? 'Hide info' : 'More info'}
        </div>
        <div className="icon">
          <div className="horiz" style={{ backgroundColor: this.props.colour }}></div>
          <div className="vert" style={{ backgroundColor: this.props.colour }}></div>
        </div>
      </div>
    );
  }
  onClick = () => {
    this.props.onClick && this.props.onClick();
  }
  componentDidUpdate() {
    const job = this.props.job;
    const el = React.findDOMNode(this);
    const title = React.findDOMNode(this.refs.title);
    const description = React.findDOMNode(this.refs.description);
    const newHeight = this.props.open && this.getLoadedState() ? (title.clientHeight + description.clientHeight) : title.clientHeight;
    el.style.height = `${newHeight}px`;
  }
}
