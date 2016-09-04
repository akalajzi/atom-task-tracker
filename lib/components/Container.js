'use babel';

import React, {Component, PropTypes} from 'react';
import {Header} from './Header';
import TaskList from './TaskList';
import ActiveTaskContainer from './ActiveTaskContainer';

export default class Container extends Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
    activeTask: PropTypes.object,
    onClose: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    // close panel
    this.props.onClose();
  }

  render() {
    const {props} = this;

    return(
      <atom-panel className='right'>
        <Header
          activeTask={props.activeTask}
          closePanel={this.onClose}
        />
        <div className='panel-body padded'>
          {
            props.activeTask &&
            <ActiveTaskContainer
              activeTask={props.activeTask}
              tasks={props.tasks}
            />
          }
          {
            !props.activeTask &&
            <TaskList
              tasks={props.tasks}
            />
          }
        </div>
      </atom-panel>
    );
  }

}
