'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';

export default class ActiveTaskTodo extends Component {
  static propTypes = {
    activeTask: PropTypes.object.isRequired,
  };

  render() {
    const {props} = this;

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
          here be list of todos
        </div>
      </div>
    );
  }
}
