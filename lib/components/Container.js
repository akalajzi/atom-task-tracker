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

  toggleConfig() {
    const newFlag = !this.state.configOpen;
    this.setState({ configOpen: newFlag });
  }

  resolveActiveContainer() {
    let title = 'Task Tracker';
    let screen = 'home';
    if (this.state.configOpen) {
      title = 'Config';
      screen = 'config';
    } else if (this.props.activeTask) {
      title = 'Active: ' + this.props.activeTask.name;
      screen = 'active';
    }
    return {
      title: title,
      screen: screen,
    };
  }


  render() {
    const {props} = this;
    const {title, screen} = this.resolveActiveContainer();

    return(
      <atom-panel className='right'>
        <Header
          title={title}
          screen={screen}
          closePanel={this.onClose}
          toggleConfig={this.toggleConfig.bind(this)}
        />
        <div className='panel-body padded'>
          {
            screen === 'config' &&
            <Config />
          }
          {
            screen === 'active' &&
            <ActiveTaskContainer
              activeTask={props.activeTask}
              tasks={props.tasks}
            />
          }
          {
            screen === 'home' &&
            <TaskList
              tasks={props.tasks}
            />
          }
        </div>
      </atom-panel>
    );
  }

}
