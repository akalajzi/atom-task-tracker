'use babel';

import React, {Component, PropTypes} from 'react';
import {Header} from './Header';
import TaskList from './TaskList';
import ActiveTaskContainer from './ActiveTaskContainer';
import Config from './Config';

export default class Container extends Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
    activeTask: PropTypes.object,
    onClose: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onClose = this.onClose.bind(this);
    this.state = { configOpen: false };
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
            this.state.configOpen &&
            <Config />
          }
          {
            props.activeTask && !this.state.configOpen &&
            <ActiveTaskContainer
              activeTask={props.activeTask}
              tasks={props.tasks}
            />
          }
          {
            !props.activeTask && !this.state.configOpen &&
            <TaskList
              tasks={props.tasks}
            />
          }
        </div>
      </atom-panel>
    );
  }

}
