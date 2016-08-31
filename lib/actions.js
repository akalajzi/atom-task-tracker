'use babel';

import * as util from './util';
import taskStore from './task-store';

export function emitChange() {
  return atom.emitter.emit('task-tracker:store-change');
}

export function getInitialState() {
  return {
    tasks: new Map(),
    activeTask: null,
  };
}

export function addTask(name) {
  hash = util.createHash(name);
  if (!util.isNameAvailable(taskStore.tasks, hash)) {
    console.log('Task name already taken');
  }

  task = {
    name: name,
    description: null,
    files: null,
  };
  taskStore.tasks.set(hash, task);
  emitChange();
  return taskStore.tasks.get(hash);
}

export function removeTask(key) {
  taskStore.tasks.delete(key);
  emitChange();
}

export function setActive(task) {
  taskStore.activeTask = task;
  emitChange();
}

export function unsetActive() {
  taskStore.activeTask = null;
  emitChange();
}

export function addMockTask() {
  const num = taskStore.tasks.size + 1;
  const name = 'Mock Task ' + num;
  hash = util.createHash(name);
  newTask = {
    name: name,
    description: null,
    files: null,
  };
  taskStore.tasks.set(hash, newTask);
  emitChange();
}

export function setATDescription(description) {
  taskStore.activeTask.description = description;
  emitChange();
}
