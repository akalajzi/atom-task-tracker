'use babel';

import React, {Component, PropTypes} from 'react';
import NewTask from './NewTask';
import * as actions from '../actions';
import * as util from '../util';

export default class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    if (props.tasks.size === 0) {
      this.state = { openNewTask: true };
    } else {
      this.state = { openNewTask: false };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks.size === 0) {
      this.setState({openNewTask: true});
    }
  }

  expandNewTask(ev) {
    ev.stopPropagation();
    this.setState({
      openNewTask: true,
    });
  }

  handleDeleteTask(hash, ev) {
    ev.stopPropagation();
    actions.removeTask(hash);
  }

  handleSelectTask(hash, ev) {
    ev.stopPropagation();
    const selected = this.props.tasks.get(hash);
    actions.setActive(selected);
  }

  taskItem(task, key) {
    const filesTrackedMsg = task.files.length === 1 ? ' file tracked' : ' files tracked';
    return(
      <div key={key} onClick={this.handleSelectTask.bind(this, key)} className="task">
        <div className="task-title">{task.name}</div>
        <div className="task-controls btn-group right">
          <button
            onClick={this.handleDeleteTask.bind(null, key)}
            className='btn tt-task-delete btn-sm btn-error icon icon-x inline-block-tight'
          ></button>
        </div>
        <div className='details'>
          {task.files.length} {filesTrackedMsg}
        </div>
      </div>
    );
  }

  taskList() {
    let out = [];
    this.props.tasks.forEach((value, key) => {
      out.push(this.taskItem(value, key));
    });
    return out;
  }

  onCancelNewTask() {
    this.setState({openNewTask: false});
  }

  onAddNewTask(name) {
    const newTask = actions.addTask(name);
    this.setState({openNewTask: false});
    actions.setActive(newTask);
  }

  verifyInput(name) {
    const hash = util.createHash(name);
    const available = util.isNameAvailable(this.props.tasks, hash);
    return available ? true : false;
  }

  render() {
    const {props} = this;
    const taskList = this.taskList();

    return(
      <div className="tasklist">

        { taskList }

        {
          !this.state.openNewTask &&
          <div onClick={this.expandNewTask.bind(this)} className="new-task-btn">
            <span className="add-new-task">+ New Task</span>
          </div>
        }

        {
          this.state.openNewTask &&
          <NewTask
            onCancel={this.onCancelNewTask.bind(this)}
            onAdd={this.onAddNewTask.bind(this)}
            verifyInput={this.verifyInput.bind(this)}
          ></NewTask>
        }

      </div>
    );
  }
}
