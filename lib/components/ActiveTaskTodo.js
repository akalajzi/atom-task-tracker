'use babel';

import React, {Component, PropTypes} from 'react';
import ActiveTaskEmpty from './ActiveTaskEmpty';
import * as actions from '../actions';

export default class ActiveTaskTodo extends Component {
  static propTypes = {
    activeTask: PropTypes.object.isRequired,
  };

  render() {
    const {props} = this;

    const emptyMessageOne = 'All done.'
    const emptyMessageTwo = 'No files tracked.'
    const emptyMessageThree = 'Click refresh icon to search for TODOs in tracked files.'

    return(
      <div className='at-todo'>
        <div className='at-todo-header'>
          <div className='title'>TODOs</div>
          <div className='controls pull-right'>
            <button
              className='btn icon icon-sync inline-block-tight'
            ></button>
          </div>
        </div>
        <div className='at-todo-list'>
          <ActiveTaskEmpty
            message={emptyMessageThree}
            />
        </div>
      </div>
    );
  }
}
