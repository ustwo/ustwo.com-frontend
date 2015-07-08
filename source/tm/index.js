'use strict';

import React from 'react';
import filter from 'lodash/collection/filter';
import remove from 'lodash/array/remove';
import findIndex from 'lodash/array/findIndex';

import {cloneWithClasses, getClonerForClasses} from './clone-with-classes';
import isIn from './is-in';
import mergeChildren from './merge-children';

const TransitionManager = React.createClass({
  displayName: 'TransitionManager',
  getInitialState() {
    const children = [].concat(this.props.children).map(getClonerForClasses(['add', 'show']));
    return {
      entering: [],
      leaving: [],
      children: children
    };
  },
  getDefaultProps() {
    return {
      component: 'span'
    };
  },
  componentWillReceiveProps(newProps) {
    const state = this.state;
    const targetChildren = [].concat(newProps.children);
    const currentChildren = state.children;
    const currentEntering = state.entering;
    const currentLeaving = state.leaving;
    const targetLeaving = filter(currentChildren, child => !isIn(child, targetChildren));
    const targetEntering = filter(targetChildren, child => (isIn(child, currentEntering) && !isIn(child, targetLeaving)) || isIn(child, currentLeaving) || !isIn(child, currentChildren));
    const persisting = filter(currentChildren, child => !isIn(child, targetEntering) && !isIn(child, targetLeaving));
    const children = mergeChildren(currentChildren, targetChildren, persisting);
    this.setState({
      entering: targetEntering,
      leaving: targetLeaving,
      children: children.map(child => isIn(child, targetEntering) ? cloneWithClasses(child, ['add']) : child)
    });
  },
  render() {
    return React.createElement(
      this.props.component,
      this.props,
      this.state.children.map(child => React.cloneElement(child, {
        ref: child.key
      }))
    );
  },
  timers: {
    entering: {},
    leaving: {}
  },
  componentDidUpdate() {
    this.state.entering.forEach((child) => {
      const key = child.key;

      // remove any existing leave timeouts
      if(this.timers.leaving[key]) {
        clearTimeout(this.timers.leaving[key]);
        delete this.timers.leaving[key];
      }

      // if doesn't exist, start an enter timeout
      if(!this.timers.entering[key]) {
        this.timers.entering[key] = setTimeout(() => {
          const state = this.state;
          const component = remove(state.entering, {
            key: key
          })[0];
          const entering = cloneWithClasses(component, ['add', 'show']);
          state.children.splice(findIndex(state.children, 'key', key), 1, entering);
          clearTimeout(this.timers.entering[key]);
          delete this.timers.entering[key];
          this.setState(state);
        }.bind(this), 10);
      }
    }, this);

    this.state.leaving.forEach((child) => {
      const key = child.key;

      // remove any existing enter timeouts
      if(this.timers.entering[key]) {
        clearTimeout(this.timers.entering[key]);
        delete this.timers.entering[key];
      }

      // if doesn't exist, start a leave timeout
      if(!this.timers.leaving[key]) {
        this.refs[key].componentWillLeave && this.refs[key].componentWillLeave();
        this.timers.leaving[key] = setTimeout(() => {
          const state = this.state;
          remove(state.leaving, {
            key: key
          });
          remove(state.children, {
            key: key
          });
          clearTimeout(this.timers.leaving[key]);
          delete this.timers.leaving[key];
          this.setState(state);
        }.bind(this), this.props.duration);
      }
    }, this);
  },
});

export default TransitionManager;
