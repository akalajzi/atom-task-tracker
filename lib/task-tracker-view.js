'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import TaskStore from './task-store';

class TaskTrackerView {
  constructor(serializedState) {

    this.onClose = this.onClose.bind(this);

    this.store = new TaskStore();

    this.defaultState = {
      tasks: this.store.tasks,
      activeTask: this.store.activeTask,
    };

    this.element = document.createElement('task-tracker');
    this.state = this.defaultState;
    this.render();

    atom.emitter.on('task-tracker:test', this.handleTest.bind(this));
    atom.emitter.on('task-tracker:store-change', this.handleStoreChange.bind(this));
  }

  setState(state) {
    Object.assign(this.state, state);
    this.render();
  }

  handleStoreChange() {
    newState = {
      tasks: this.store.tasks,
      activeTask: this.store.activeTask,
    }
    this.setState(newState);
  }

  render() {
    const {state} = this;
    console.log('render');

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
    this.state = this.defaultState();
    ReactDOM.unmountComponentAtNode(this.element);
  }

  toggle(visible) {
    return visible ? this.render() : this.removeComponents();
  }

  handleTest() {
    this.store.loadMockData();
    // TODO: implement dispatchChange
  }

};

export default TaskTrackerView;
