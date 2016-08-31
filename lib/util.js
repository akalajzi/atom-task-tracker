'use babel';

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
