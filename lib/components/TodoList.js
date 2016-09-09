'use babel';

import React, {Component, PropTypes} from 'react';

export default class TodoList extends Component {
  static propTypes = {
    fileTodos: PropTypes.object.isRequired,
  };

  handleOpenFileOnTodo(match) {
    const uri = this.props.fileTodos.filePath;
    const options = {
      initialLine: match.range[0][0],
      initialColumn: match.range[0][1]
    }
    atom.workspace.open(uri, options);
  }

  render() {
    return(
      <div className='todo-item-list'>
      {
        this.props.fileTodos.matches.map((match, index) => {
          return (
            <div
              key={index}
              onClick={this.handleOpenFileOnTodo.bind(this, match)}
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
