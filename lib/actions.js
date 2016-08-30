'use babel';

import util from './util';
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

export function addTask(store, name) {
  hash = util.createHash(name);
  if (store.tasks.has(hash)) {
    console.log('TODO: handle name error thingy');
    return atom.emitter.emit('task-tracker:name-error');
  }

  task = {
    name: name,
    description: null,
    files: null,
  };
  store.tasks.set(hash, task);
  return store;
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
