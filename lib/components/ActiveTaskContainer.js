'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';

export default class ActiveTaskContainer extends Component {
  static propTypes = {
    activeTask: PropTypes.object.isRequired,
    tasks: PropTypes.object,
  };

  constructor() {
    super();
  }

  handleUnsetTask(ev) {
    ev.stopPropagation();
    actions.unsetActive();
  }

  render() {
    const {props} = this;

    return(
      <div className='active-task'>
        <div className='task-body'>
          asdf asdf asdf
        </div>
      </div>
    );
  }
}
