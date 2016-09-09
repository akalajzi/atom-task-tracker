'use babel';

import React, {Component, PropTypes} from 'react';

export default class TodoList extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
  };

  handleOpenFileOnTodo() {
    const todo = this.props.todo;
    console.log('handleOpenFileOnTodo', todo);
    // TODO: check this
    // atom.workspace.open(todo.filePath, todo.matches.range);
  }

  render() {
    return(
      <div className='todo-item-list'>
      {
        this.props.todo.matches.map((match, index) => {
          return (
            <div
              key={index}
              onClick={this.handleOpenFileOnTodo.bind(this)}
              className='todo-item clickable'
              >
              {match.matchText}
            </div>
          )
        })
      }
      </div>
    );
  }
}
