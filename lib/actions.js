'use babel';

import _ from 'underscore-plus';
import * as util from './util';
import taskStore from './task-store';
import searchPatterns from './search-patterns';

export function emitChange() {
  return atom.emitter.emit('task-tracker:store-change');
}

export function emitSizeChange() {
  return atom.emitter.emit('task-tracker:size-change');
}

export function emitFileAdd() {
  return atom.emitter.emit('task-tracker:file-add');
}

export function getInitialState() {
  return {
    tasks: new Map(),
    activeTask: null,
    ui: {
      size: 'tt-wide',
      searchPatterns: searchPatterns,
    }
  };
}

export function setPanelSize(size) {
  taskStore.ui = {
    size: 'tt-' + size,
  };
  emitSizeChange();
}

export function getPanelSize() {
  return taskStore.ui.size;
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

export function setATDescription(description) {
  taskStore.activeTask.description = description;
  emitChange();
}

export function addFile(path) {
  if (!taskStore.activeTask) { return null; }
  if (_.indexOf(taskStore.activeTask.files, path) === -1) {
    taskStore.activeTask.files.push(path);
    emitChange();
  }
  emitFileAdd();
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

export function getSearchPatterns() {
  if (!taskStore.ui.searchPatterns) {
    // set defaults if not already in the store
    taskStore.ui.searchPatterns = searchPatterns;
  }
  return taskStore.ui.searchPatterns;
}

export function saveSearchPatterns(searchPatterns) {
  taskStore.ui.searchPatterns = searchPatterns;
  emitChange();
}
