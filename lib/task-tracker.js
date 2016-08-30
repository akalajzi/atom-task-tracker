'use babel';

import TaskTrackerView from './task-tracker-view';
import {CompositeDisposable} from 'atom';

const TaskTracker = {

  ttView: null,
  panel: null,
  subscriptions: null,

  activate(state) {
    this.ttView = new TaskTrackerView(state.ttViewState);

    this.panel = atom.workspace.addRightPanel({
      item: this.ttView.getElement(),
      visible: false,
    });

    this.subscriptions = new CompositeDisposable;

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'task-tracker:toggle': this.toggle.bind(this),
        'task-tracker:test': this.test.bind(this),
      }),
    );

    atom.emitter.on('task-tracker:close', this.close.bind(this));

  },

  deactivate() {
    this.panel.destroy();
    this.subscriptions.dispose();
    this.ttView.destroy();
    return
  },

  serialize() {
  },

  close() {
    return this.panel.hide();
  },

  toggle() {
    if (this.panel.isVisible()) {
      this.close();
    } else {
      this.panel.show();
      atom.emitter.emit('task-tracker:show');
    }
  },

  test() {
    console.log('this is test');
    atom.emitter.emit('task-tracker:test');
    return
  },


};

export default TaskTracker;
