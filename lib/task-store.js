'use babel';

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
      description: null,
      files: null,
    };
    this.tasks.set(name, task);
    this.emitChange();
  }

  removeTask(task) {
    this.tasks.delete(task);
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
