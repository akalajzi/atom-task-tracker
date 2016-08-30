'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';

export default class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
  };

  constructor() {
    super();
  }

  handleAddNewTask(ev) {
    ev.stopPropagation();
    console.log('handle add new task');
  }

  handleDeleteTask(hash, ev) {
    ev.stopPropagation();
    console.log('remove hash', hash);
    actions.removeTask(hash);
  }

  handleSelectTask(hash, ev) {
    ev.stopPropagation();
    console.log('handle select task. hash: ', hash);
    const selected = this.props.tasks.get(hash);
    console.log('selected: ', selected);
    this.props.selectTask(selected);
  }

  taskItem(name, key) {
    return(
      <div key={key} onClick={this.handleSelectTask.bind(null, key)} className="task even">
        <div className="task-title">{name}</div>
        <div className="task-controls btn-group right">
          <button
            onClick={this.handleDeleteTask.bind(null, key)}
            className='btn tt-task-delete btn-sm btn-error icon icon-x inline-block-tight'
          ></button>
        </div>
      </div>
    );
  }

  taskList() {
    let out = [];
    this.props.tasks.forEach((value, key) => {
      out.push(this.taskItem(value.name, key));
    });
    return out;
  }

  render() {
    const {props} = this;
    const taskList = this.taskList();

    return(
      <div className="tasklist">
        <div className="task odd">
          <div className="task-title">tp65739 - nesto nesto za napravit nesto</div>
          <div className="task-controls btn-group right">
            <button className='btn tt-task-delete btn-sm btn-error icon icon-x inline-block-tight'></button>
          </div>
        </div>
        <div className="task even">
          <div className="task-title">tp75938</div>
          <div className="task-controls btn-group right">
            <button className='btn icon icon-chevron-up inline-block-tight'>Close</button>
            <button className='btn tt-task-delete icon icon-x inline-block-tight'>Delete</button>
          </div>
        </div>

        { taskList }

        <div className="new-task-btn">
          <span onClick={this.handleAddNewTask} className="add-new-task">+ New Task</span>
        </div>
      </div>
    );
  }
}
