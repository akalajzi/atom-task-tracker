'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import taskStore from './task-store';

import * as actions from './actions';



class TaskTrackerView {

  @deserialize({store}) {
    new TaskTrackerView(store)
  }

  constructor(serializedState) {

    atom.deserializers.add(this);

    this.state = serializedState ? serializedState : actions.getInitialState()
    taskStore.tasks = this.state.tasks;
    taskStore.activeTask = this.state.activeTask;

    this.onClose = this.onClose.bind(this);

    this.element = document.createElement('task-tracker');
    this.render();

    atom.emitter.on('task-tracker:test', this.handleTest.bind(this));
    atom.emitter.on('task-tracker:store-change', this.handleStoreChange.bind(this));
  }

  setState(state) {
    Object.assign(this.state, state);
    this.render();
  }

  handleStoreChange() {
    this.setState(taskStore.get());
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

  // deserialize({store}) {
  //   new TaskTrackerView(store);
  // }

  serialize() {
    return({
      deserializer: 'TaskTrackerView',
      store: taskStore
    });
  }

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

  handleTest() {
    actions.addMockTask();
    this.setState(taskStore.get());
  }

};

export default TaskTrackerView;
