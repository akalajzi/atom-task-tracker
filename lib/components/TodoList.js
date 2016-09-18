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

  resolveTodoType(text) {
    let out = 'todo-item clickable';
    if (text.indexOf('FIXME') === 0) { out += ' fixme'; }
    if (text.indexOf('console.log') === 0) { out += ' clog'; }
    return out;
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
              className={this.resolveTodoType(match.matchText)}
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
