'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import Flux from '../flux';

export default class JobItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  onClickJobItem = () => {
    Flux.getJobDetails(this.props.job.shortcode);
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    const job = this.props.job;
    const classes = classnames('job-item', {
      open: this.state.open,
      loading: this.state.open && !this.getLoadedState()
    });
    return (
      <li className={classes}>
        <h4 ref='title' className="title" onClick={this.onClickJobItem}>
          <span className="title-text">{get(job, 'title')}</span> {this.renderStatus()}</h4>
        <div ref='description' className="job-description">
          <p className="description-text">{get(job, 'description')}</p>
          <a className="link" href={get(job, 'url')} style={{ borderBottomColor: this.props.colour }}>Read full description</a>
        </div>
      </li>
    );
  }
  getLoadedState = () => {
    return get(this.props.job, 'description');
  }
  renderStatus = () => {
    const loaded = this.getLoadedState();
    return (
      <div className="status">
        <div className="status-text">
          {this.state.open && loaded ? 'Hide info' : 'More info'}
        </div>
        <div className="icon">
          <div className="horiz" style={{ backgroundColor: this.props.colour }}></div>
          <div className="vert" style={{ backgroundColor: this.props.colour }}></div>
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    const job = this.props.job;
    const el = React.findDOMNode(this);
    const title = React.findDOMNode(this.refs.title);
    const description = React.findDOMNode(this.refs.description);
    const newHeight = this.state.open && this.getLoadedState() ? (title.clientHeight + description.clientHeight) : title.clientHeight;
    el.style.height = `${newHeight}px`;
  }
}
