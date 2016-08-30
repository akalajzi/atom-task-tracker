'use babel';

import util from './util';

export function emitChange() {
  return atom.emitter.emit('task-tracker:store-change');
}

export function getInitialState() {
  return {
    tasks: new Map(),
    activeTask: null,
  };
}

export function addTask(state, name) {
  hash = util.createHash(name);
  if (state.tasks.has(hash)) {
    console.log('TODO: handle name error thingy');
    return atom.emitter.emit('task-tracker:name-error');
  }

  task = {
    name: name,
    description: null,
    files: null,
  };
  state.tasks.set(hash, task);
  return state;
}

export function removeTask(state, key) {
  state.tasks.delete(key);
  return state;
}

export function setActive(state, task) {
  state.activeTask = task;
  return state;
}

export function unsetActive(state) {
  state.activeTask = null;
  return state;
}

export function addMockTask(state) {
  const num = state.tasks.size + 1;
  const name = 'Mock Task ' + num;
  hash = util.createHash(name);
  newTask = {
    name: name,
    description: null,
    files: null,
  };
  state.tasks.set(hash, newTask);
  return state;
}
