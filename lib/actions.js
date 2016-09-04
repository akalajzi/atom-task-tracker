'use babel';

import _ from 'underscore-plus';
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
    description: '',
    files: [],
    todos: [],
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
    description: 'mock description',
    files: [],
    todos: [],
  };
  taskStore.tasks.set(hash, newTask);
  emitChange();
}

export function setATDescription(description) {
  taskStore.activeTask.description = description;
  emitChange();
}

export function addFile(path) {
  if (_.indexOf(taskStore.activeTask.files, path) === -1) {
    taskStore.activeTask.files.push(path);
    emitChange();
  }
}

export function removeFile(path) {
  taskStore.activeTask.files = _.without(taskStore.activeTask.files, path);
  emitChange();
}

export function removeAllFiles() {
  taskStore.activeTask.files = [];
  emitChange();
}

export function isFileTracked(path) {
  return (_.indexOf(taskStore.activeTask.files, path) > -1) ? true : false;
}
