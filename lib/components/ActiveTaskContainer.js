'use babel';

import React, {Component, PropTypes} from 'react';
import ActiveTaskDescription from './ActiveTaskDescription';
import ActiveTaskFiles from './ActiveTaskFiles';
import * as actions from '../actions';

export default class ActiveTaskContainer extends Component {
  static propTypes = {
    activeTask: PropTypes.object.isRequired,
    tasks: PropTypes.object,
  };

  handleUnsetTask(ev) {
    ev.stopPropagation();
    // overwrite task
    tasks.set(activeTask);
    actions.unsetActive();
  }

  render() {
    const {props} = this;
    const hide = true;

    // TODO: move only needed props, not whole active task
    return(
      <div className='active-task'>
        <div className='task-body'>
          <ActiveTaskDescription
            activeTask={props.activeTask}
            />
          <ActiveTaskFiles
            activeTask={props.activeTask}
            />
        </div>
      </div>
    );
  }
}
