'use babel';

import fs from 'fs';
import _ from 'underscore-plus';

export function createHash(str) {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export function isNameAvailable(tasks, hash) {
  return tasks.has(hash) ? false : true;
};

export function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

export function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

export function saveToStorage(state) {
  let obj = {
    activeTask: state.activeTask,
    tasks: this.strMapToObj(state.tasks),
  }
  localStorage.setItem('atom-task-tracker', JSON.stringify(obj));
}

export function loadFromStorage() {
  const stored = localStorage.getItem('atom-task-tracker');
  if (!stored) { return null; }
  const obj = JSON.parse(stored);
  newStore = {
    activeTask: obj.activeTask,
    tasks: this.objToStrMap(obj.tasks),
  }
  return newStore;
}

export function runningWindows() {
  const platform = process.platform;
  return (platform.indexOf('win') === 0) ? true : false;
}

export function getActiveEditor() {
  return atom.workspace.getActiveTextEditor();
}

export function getCurrentPath() {
  const editor = atom.workspace.getActiveTextEditor();
  return editor ? editor.getPath() : '';
}

export function pathExists(path) {
  return fs.existsSync(path);
}

export function splitPathnameAndFilename(fullPath) {
  if (fullPath.length === 0) {
    return {relativePath: '', filename: ''};
  }
  const split = atom.project.relativizePath(fullPath);
  const splitStr = this.runningWindows() ? '\\' : '/';
  // TODO: debug this on windows
  if (split[1]) { // cannot bookmark folders (for now)
    const pathArray = split[1].split(splitStr);
    const relativePath = (_.initial(pathArray)).join(splitStr);
    return {
      'relativepath': relativePath + splitStr,
      'filename': _.last(pathArray)
    };
  }
  return null;
}
