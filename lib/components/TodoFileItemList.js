'use babel';

import React, {Component, PropTypes} from 'react';
import TodoItem from './TodoItem';

export default class TodoFileItemList extends Component {
  static propTypes = {
    fileItem: PropTypes.object.isRequired,
  };

  render() {
    const {props} = this;
    return(
      <div className='at-todo-file'>
        <div className='todo-filename'>
          {props.fileItem.relativePath}
        </div>
        <div className='todo-list'>
          {
            props.fileItem.matches.map((todo, index) => {
              return(
                <TodoItem key={index} todo={todo} />
              )
            })
          }
        </div>
      </div>
    );
  }
}
