'use babel';

import React from 'react';
import ReactDOM from 'react-dom';

class TaskTrackerView {
  constructor(serializedState) {

    this.defaultState = {
      items: [],
      loading: true,
    };

    this.element = document.createElement('task-tracker');
    this.state = this.defaultState;
    this.render();
  }

  setState(state) {
    Object.assign(this.state, state);
    this.render();
  }

  render() {
    const {state} = this;
    console.log('render');
  }

  onRefresh() { return atom.emitter.emit('task-tracker:refresh'); }

  onClose() { return atom.emitter.emit('task-tracker:close'); }

  serialize() {}

  destroy() {
    ReactDOM.unmountComponentAtNode(this.element);
    return this.element.remove();
  }

  getElement() { return this.element; }

  removeComponents() {
    this.state = this.defaultState();
    ReactDOM.unmountComponentAtNode(this.element);
  }

  toggle(visible) {
    return visible ? this.render() : this.removeComponents();
  }
};

export default TaskTrackerView;
