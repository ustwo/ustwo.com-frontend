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
        <h4 ref='title' className="title" onClick={this.onClickJobItem}>{get(job, 'title')} {this.renderStatus()}</h4>
        <div ref='description' className="job-description">
          <p className="description-text">{get(job, 'description')}</p>
          <a href={get(job, 'url')}>Read full description</a>
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
      <span className="status">
        {loaded ? 'Hide info' : 'More info'}
        <span className="horiz"></span>
        <span className="vert"></span>
      </span>
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
