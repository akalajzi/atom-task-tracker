'use babel';

import util from './util';

class TaskStore {
  constructor() {
    this.tasks = new Map();
    this.activeTask = null;
  }

  emitChange() {
    return atom.emitter.emit('task-tracker:store-change');
  }

  addTask(name) {
    task = {
      name: name,
      description: null,
      files: null,
    };
    hash = util.createHash(name);
    this.tasks.set(hash, task);
    this.emitChange();
  }

  removeTask(key) {
    this.tasks.delete(key);
    this.emitChange();
  }

  setActive(task) {
    this.activeTask = task;
    this.emitChange();
  }

  unsetActive() {
    this.activeTask = null;
    this.emitChange();
  }

  reset() {
    this.tasks = new Map();
    this.activeTask = null;
    this.emitChange();
  }

  loadMockData() {
    console.log('loading mocked data');
    this.addTask('prvi task');
    this.addTask('neki drugi task');
  }

}

export default TaskStore;
