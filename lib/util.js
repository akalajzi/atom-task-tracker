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
    ui: state.ui,
  }
  localStorage.setItem('atom-task-tracker', JSON.stringify(obj));
}

export function restartStorage(state) {
  localStorage.removeItem('atom-task-tracker');
  this.saveToStorage(state);
}

export function loadFromStorage() {
  const stored = localStorage.getItem('atom-task-tracker');
  if (!stored) { return null; }
  const obj = JSON.parse(stored);
  newStore = {
    activeTask: obj.activeTask,
    tasks: this.objToStrMap(obj.tasks),
    ui: obj.ui,
  }
  return newStore;
}

export function getDirDelimiter() {
  return (process.platform.indexOf('win') === 0) ? '\\' : '/';
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
  const splitStr = this.getDirDelimiter();
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

export function groupPathsByFolder(paths) {
  output = {};
  for (let path of paths) {
    item = this.splitPathnameAndFilename(path);
    if (!item) { return output; }
    if (output[item.relativepath]) {
      output[item.relativepath].push({filename: item.filename, path: path});
      output[item.relativepath].sort(this.sortFilenameCallback);
    } else {
      output[item.relativepath] = [{filename: item.filename, path: path}];
    }
  }
  return output;
}

export function sortFilenameCallback(a,b) {
  if (a.filename > b.filename) { return 1; }
  if (a.filename < b.filename) { return -1; }
  return 0;
}

export function sortDirectories(directories) {
  let out = directories;
  out.sort();
  const d = this.getDirDelimiter();
  if (_.first(out) === d) {
    out = _.rest(out);
    out.push(d);
  }
  return out;
}

export function groupPathsByProject(paths) {
  directories = atom.project.getDirectories();
  output = {};
  for (let dir of directories) {
    output[dir.getBaseName()] = _.filter(paths, (path) => {
      if (path.indexOf(dir.realPath) === 0) { return path; }
    });
  }
  return output;
}

export function filterProjectsWithTrackedFiles(filesByProject) {
  const projectNames = _.keys(filesByProject);
  return _.filter(projectNames, (projectName) => {
    if (filesByProject[projectName].length > 0) { return projectName; }
  });
}

export function getActiveSearchPatterns(searchPatterns) {
  // takes full searchPatterns object from the store
  // outputs flatten array of all selected search patterns
  let out = [];
  searchPatterns.forEach((pattern) => {
    if (pattern.checked) {
      out.push(pattern.variations);
    }
  });
  return _.flatten(out);
}

export function searchTodos(paths, activeSearchPatterns) {
  results = [];
  let sPatterns = activeSearchPatterns;

  function iterator(result) {
    result.relativePath = atom.project.relativizePath(result.filePath)[1];
    return results.push(result);
  }

  function relativizePaths(paths) {
    return paths.map((path) => {
      return atom.project.relativizePath(path)[1];
    });
  }

  sPatterns = activeSearchPatterns.map((pat) => {
    return '.*' + pat + '.*'
  })
  pattern = sPatterns.join('|');
  flags = 'g';
  regex = new RegExp(pattern, flags);
  options = {
    paths: relativizePaths(paths),
  };

  return new Promise(resolve => {
    return atom.workspace.scan(regex, options, iterator)
      .then(() => {
        return results;
      })
      .then(resolve);
  });
}
