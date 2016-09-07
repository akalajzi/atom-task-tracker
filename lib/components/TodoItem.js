'use babel';

import React, {Component, PropTypes} from 'react';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
  };

  render() {
    return(
      <div className='todo-item'>{this.props.todo.matchText}</div>
    );
  }
}
