'use babel';

const taskStore = {
  tasks: new Map(),
  activeTask: null,

  get() {
    return {
      tasks: this.tasks,
      activeTask: this.activeTask,
    }
  }

}

export default taskStore;
