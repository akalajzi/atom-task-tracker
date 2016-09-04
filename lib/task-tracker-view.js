'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import taskStore from './task-store';

import * as actions from './actions';
import * as util from './util';


class TaskTrackerView {

  constructor(loadedState) {
    if (loadedState) {
      this.state = {
        activeTask: loadedState.activeTask,
        tasks: loadedState.tasks,
        ui: loadedState.ui,
      }
    } else {
      this.state = actions.getInitialState();
    }

    taskStore.tasks = this.state.tasks;
    taskStore.activeTask = this.state.activeTask;
    taskStore.ui = this.state.ui;

    this.onClose = this.onClose.bind(this);

    this.element = document.createElement('task-tracker');
    if (this.state.ui) {
      // temp fix for localstorage not having ui written
      this.element.classList.add(this.state.ui.size);
    }
    this.render();

    atom.emitter.on('task-tracker:store-change', this.handleStoreChange.bind(this));
    atom.emitter.on('task-tracker:ensure-save', this.handleSave.bind(this));
    atom.emitter.on('task-tracker:size-change', this.handleSizeChange.bind(this));
  }

  setState(state) {
    Object.assign(this.state, state);
    this.render();
  }

  handleStoreChange() {
    const newState = taskStore.get();
    this.setState(newState);
    util.saveToStorage(newState);
  }

  handleSave() {
    util.saveToStorage(taskStore.get());
  }

  handleSizeChange() {
    const size = taskStore.ui.size;
    this.element.classList.remove('tt-narrow', 'tt-wide');
    this.element.classList.add(size);
  }

  render() {
    const {state} = this;

    ReactDOM.render(
      <Container
        onClose={this.onClose}
        tasks={state.tasks}
        activeTask={state.activeTask}
      />,
      this.element
    );
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
    this.state = actions.getInitialState();
    ReactDOM.unmountComponentAtNode(this.element);
  }

  toggle(visible) {
    return visible ? this.render() : this.removeComponents();
  }

};

export default TaskTrackerView;
