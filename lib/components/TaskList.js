'use babel';

import React, {Component, PropTypes} from 'react';

export default class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    console.log('inside RENDER');
    const {props} = this;

    const list += () => {
      console.log('inside list tasks: ', props.tasks.entries());
      for (var [name, task] of props.tasks.entries()) {
        return(
          <div className="task even">
            <div className="task-title">{name}</div>
            <div className="task-controls btn-group right">
              <button className='btn tt-task-delete btn-sm btn-error icon icon-x inline-block-tight'></button>
            </div>
          </div>
        );
      }
    }

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

        {
          list
        }

        <div className="new-task-btn">
          <span className="add-new-task">+ New Task</span>
        </div>
      </div>
    );
  }
}
