'use babel';

import TaskTrackerView from './task-tracker-view';
import {CompositeDisposable} from 'atom';
import * as util from './util';

const TaskTracker = {

  ttView: null,
  panel: null,
  subscriptions: null,

  activate(state) {

    const loadedState = util.loadFromStorage();
    this.ttView = new TaskTrackerView(loadedState);

    this.panel = atom.workspace.addRightPanel({
      item: this.ttView.getElement(),
      visible: false,
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'task-tracker:toggle': this.toggle.bind(this),
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
    // switched to local storage instead to preserve tasks across projects
  },

  close() {
    return this.panel.hide();
  },

  toggle() {
    if (this.panel.isVisible()) {
      this.close();
    } else {
      this.panel.show();
    }
  },

};

export default TaskTracker;
