'use babel';

import _ from 'underscore-plus';

const taskStore = {
  tasks: new Map(),
  activeTask: {
    name: '',
    description: '',
    files: [],
  },
  git: null,
  ui: {
    size: 'tt-wide',
    searchPatterns: [],
  },

  get() {
    return {
      tasks: this.tasks,
      activeTask: this.activeTask,
      ui: this.ui,
    }
  }

}

export default taskStore;
