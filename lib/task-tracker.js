'use babel';

//import TaskTrackerView from './task-tracker-view';
import {CompositeDisposable} from 'atom';

const TaskTracker = {

  ttView: null,
  panel: null,
  subscriptions: null,

  activate(state) {
    //@ttView = new TaskTrackerView(state.ttViewState);

    this.subscriptions = new CompositeDisposable;

    this.subscriptions.add(
      atom.commands.add('atom-workspace', { 'task-tracker:test': this.test.bind(this)})
    );


  },

  deactivate: () => {
    //@panel.destroy();
    this.subscriptions.dispose();
    //@ttView.destroy();
    return
  },

  serialize: () => {
  },

  test: () => {
    console.log('this is test');
  },


};

export default TaskTracker;
