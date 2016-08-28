'use babel';

import React, {Component, PropTypes} from 'react';
import Header from './Header';
import TaskList from './TaskList';

export default class Container extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.onClose();
  }

  render() {
    const {props} = this;

    return(
      <atom-panel className='right'>
        <Header
          onClose={this.onClose}
        />
        <div className='panel-body padded'>
          <TaskList
            tasks={props.tasks}
          />
        </div>
      </atom-panel>
    );
  }

}
