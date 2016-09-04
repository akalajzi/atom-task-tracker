'use babel';

import _ from 'underscore-plus';

const taskStore = {
  tasks: new Map(),
  activeTask: {
    name: '',
    description: '',
    files: [],
    todos: []
  },
  git: null,

  get() {
    return {
      tasks: this.tasks,
      activeTask: this.activeTask,
    }
  }

}

export default taskStore;
