'use babel';

import _ from 'underscore-plus';

const taskStore = {
  tasks: new Map(),
  activeTask: {

    enableFileChanges() {
      this.activeTask.disabled = false;
    }

    disableFileChanges() {
      this.activeTask.disabled = true;
    }

    setDescription(description) {
      this.activeTask.description = description;
    }

    addFile(path) {
      this.activeTask.files.push(path);
    }

    removeFile(path) {
      return _.without(this.activeTask.files, [path]);
    }
  },

  get() {
    return {
      tasks: this.tasks,
      activeTask: this.activeTask,
    }
  }

}

export default taskStore;
