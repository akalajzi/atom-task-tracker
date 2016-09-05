'use babel';

import React, {Component, PropTypes} from 'react';
import ActiveTaskEmpty from './ActiveTaskEmpty';
import * as actions from '../actions';

export default class ActiveTaskTodo extends Component {
  static propTypes = {
    activeTask: PropTypes.object.isRequired,
  };

  MSG_NO_FILES = 'No files tracked.';
  MSG_DIDNT_SEARCH = 'Click refresh icon to search for TODOs in tracked files.';
  MSG_FINISHED_SEARCH = 'All done, no TODOs found.';

  constructor(props) {
    super(props);
    this.state = {
      searched: false,
    };
  }

  componentDidMount() {
    this.setState({
      searched: false,
    });
  }

  refresh() {
    this.setState({searched: true});
    console.log('refresh');
  }

  resolveEmptyMsg() {
    let msg = '';
    if (this.props.activeTask.files.length === 0) {
      msg = this.MSG_NO_FILES;
    } else if (this.state.searched) {
      msg = this.MSG_FINISHED_SEARCH;
    } else {
      msg = this.MSG_DIDNT_SEARCH;
    }
    return msg;
  }

  render() {
    const {props} = this;
    const emptyMessage = this.resolveEmptyMsg();

    return(
      <div className='at-todo-container'>
        <div className='at-todo'>
          <div className='todo-refresh-control'>
            <button
              onClick={this.refresh.bind(this)}
              className='btn icon icon-sync inline-block-tight'
              ></button>
          </div>
          <div className='at-todo-header'>
            <div className='title'>TODOs</div>
          </div>
        </div>
        <div className='at-todo-list'>
          <ActiveTaskEmpty
            message={emptyMessage}
            />
        </div>
      </div>
    );
  }
}
